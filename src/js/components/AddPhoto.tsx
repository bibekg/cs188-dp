import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'

import TextInput from './TextInput'
import Text from './Text'
import Button from './Button'
import ExitButton from './ExitButton'

import copy from '../copy'
import { getPhotoDetails, uploadToCloudinary } from '../util/image'
import { ImageMediaItem, MediaItemType } from '../type-defs/MediaItem'
import * as actions from '../actions'
import { Trip } from '../type-defs/Trip'

const Wrapper = styled.div`
  text-align: center;
  padding: 10px;
`

const Title = styled(Text)`
  margin: 20px 0;
`

const Subtitle = styled(Text)`
  margin: 20px 0;
`

const AddPhotoForm = styled.form`
  text-align: left;
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: 20px;
  }

  ${TextInput} {
    margin-top: 5px;
  }
`

interface PropsType {
  trips: Trip[]
  match: any
  addMedia: (medium: ImageMediaItem, trip: Trip) => void
}

interface StateType {
  titleValue: string
  captionValue: string
  photo: any
  photoLocationNameValue: string
  submitted: boolean
}

class AddPhoto extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      titleValue: '',
      captionValue: '',
      photoLocationNameValue: '',
      photo: null,
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNewFileInput = this.handleNewFileInput.bind(this)
  }

  handleChange(event: React.SyntheticEvent<any>) {
    const { name, value } = event.target
    if (
      name === 'title' ||
      name === 'caption' ||
      name === 'photoLocationName'
    ) {
      // @ts-ignore
      this.setState({
        [`${name}Value`]: value
      })
    }
  }

  // When a user selects a photo, update our state with the base64 representation of it
  // to later submit to the Firebase DB
  async handleNewFileInput(event: React.SyntheticEvent<HTMLInputElement>) {
    const file = event.target.files[0]
    const photo = await getPhotoDetails(file)
    this.setState({ photo })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    // @ts-ignore
    const imageMedia: ImageMediaItem = {}
    imageMedia.type = MediaItemType.Image
    imageMedia.id = uuidv1()
    imageMedia.dateTime = new Date()

    // Upload the picture to Cloudinary and wait for the URL to be sent back
    const cloudinaryResult = (await uploadToCloudinary(
      this.state.photo.file
    )) as any
    imageMedia.src = cloudinaryResult.secure_url

    // Conditionally build location object based on whether it was provided or not
    const locationObj: any = {}
    if (this.state.photo.coordinates) {
      locationObj.lat = this.state.photo.coordinates.lat
      locationObj.lng = this.state.photo.coordinates.lng
    }
    if (this.state.photoLocationNameValue.trim() !== '') {
      locationObj.name = this.state.photoLocationNameValue.trim()
    }

    imageMedia.location = locationObj
    imageMedia.description = this.state.captionValue

    const tripId = this.props.match.params.tripId
    const trip = this.props.trips.find(t => t.id === tripId)

    this.props.addMedia(imageMedia, trip!)

    this.setState({
      submitted: true
    })
    return false
  }

  render() {
    const { tripId } = this.props.match.params
    if (this.state.submitted) {
      return <Redirect to={`/trip/${tripId}/edit`} />
    }

    const { title, subtitle, fields, photoButtonText } = copy.addMedia.photo
    return (
      <Wrapper>
        <Link to={`/trip/${tripId}/edit`}>
          <ExitButton />
        </Link>
        <Title medium bold>
          {title}
        </Title>
        <Title>{subtitle}</Title>
        {/* Exit button back to current trip catalog */}
        <AddPhotoForm onSubmit={this.handleSubmit}>
          <div>
            <Text bold>{fields.caption.name}</Text>
            <TextInput
              required
              type="text"
              name="caption"
              value={this.state.captionValue}
              onChange={this.handleChange}
              placeholder={fields.caption.placeholder}
            />
          </div>
          <div>
            <Text bold>{fields.upload.name}</Text>
            <input type="file" id="single" onChange={this.handleNewFileInput} />
            <br />

            {// Show the selected photo information if there is one
            this.state.photo && (
              <div>
                <img
                  src={this.state.photo.dataURL}
                  alt={this.state.titleValue}
                  width="50"
                  height="50"
                />
                <br />
                {this.state.photo.coordinates && (
                  <Text>Latitude: {this.state.photo.coordinates.lat}</Text>
                )}
                {this.state.photo.coordinates && (
                  <Text>Longitude: {this.state.photo.coordinates.lng}</Text>
                )}
                <div>
                  <Text bold>{fields.photoLocationName.name}</Text>
                  <TextInput
                    type="text"
                    name="photoLocationName"
                    value={this.state.photoLocationNameValue}
                    onChange={this.handleChange}
                    placeholder={fields.photoLocationName.placeholder}
                  />
                </div>
              </div>
            )}
          </div>
          <Button pinned primary>
            {photoButtonText}
          </Button>
        </AddPhotoForm>
      </Wrapper>
    )
  }
}

export default connect(
  (state: any) => ({
    trips: state.trip
  }),
  { addMedia: actions.addMedia }
)(AddPhoto)
