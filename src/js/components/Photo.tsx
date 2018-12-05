import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'
import { Formik, Field, ErrorMessage } from 'formik'
import dotty from 'dotty'
import dateFormat from 'dateformat'

import * as actions from '../actions'
import copy from '../copy'
import {
  getPhotoDetails,
  uploadToCloudinary,
  PhotoDetails
} from '../util/image'
import { TIME_REGEXP } from '../util/datetime'
import {
  ImageMediaItem,
  MediaItemType,
  MediaItem
} from '../type-defs/MediaItem'
import { Trip } from '../type-defs/Trip'
import { colors } from '../styles'
import Button from './Button'
import ExitButton from './ExitButton'
import { FormikTextInput, FormikTextarea } from './formik'
import TextInput from './TextInput'
import Text from './Text'
import LocationSelector from './LocationSelector'
import OptionalFlag from './OptionalFlag'
import LoadingScreen from './LoadingScreen'

const Wrapper = styled.div`
  text-align: center;
  padding: 10px;
`

const Title = styled(Text)`
  margin: 20px 0;
`

const PhotoForm = styled.form`
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

const FormContent = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 20px;š
  }
`

const ReselectLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
`

const ImagePreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-height: 150px;
  }
`

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  & > * {
    width: 50%;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
`

const ErrorMessageDiv = styled.div`
  color: ${colors.red};
`

interface Coordinates {
  lat: number
  lng: number
}

interface PropsType {
  trips: Trip[]
  match: any
  addMedium: (medium: ImageMediaItem, trip: Trip) => void
  updateMedium: (medium: ImageMediaItem, trip: Trip) => void
}

interface StateType {
  loadingPhoto: boolean
  photo: PhotoDetails | null
  coordinates: Coordinates | null
  submitted: boolean
}

class Photo extends React.Component<PropsType, StateType> {
  existingMedium: ImageMediaItem | null = null
  uploadInput: HTMLInputElement | null = null

  static validateForm = (values: any) => {
    const errors: any = {}

    if (new Date(values.date).toString() === 'Invalid Date') {
      errors.date = 'Invalid date'
    }

    if (!TIME_REGEXP.test(values.time)) {
      errors.time = 'Invalid time'
    }
    return errors
  }

  constructor(props: PropsType) {
    super(props)
    const initialState: StateType = {
      loadingPhoto: false,
      photo: null,
      coordinates: null,
      submitted: false
    }

    const cm = this.getCurrentMedia(props.trips)
    if (cm) {
      const { medium, state: stateUpdate } = cm
      this.existingMedium = medium
      this.state = {
        ...initialState,
        ...stateUpdate
      }
    } else {
      this.state = initialState
    }
  }

  getCurrentMedia(
    trips: Trip[]
  ): { medium: ImageMediaItem; state: StateType } | null {
    const stateUpdate: any = {}
    const { tripId, mediaId } = this.props.match.params
    const trip = trips.find(trip => trip.id === tripId)
    const medium =
      mediaId && trip && trip.media.find(medium => medium.id === mediaId)
    if (medium && medium.type === MediaItemType.Image) {
      stateUpdate.photo = {
        dataURL: medium.src,
        dateTime: medium.dateTime
      }
      if (medium.location) {
        stateUpdate.photo.coordinates = medium.location
        stateUpdate.coordinates = medium.location
      }
      return { medium, state: stateUpdate }
    } else {
      return null
    }
  }

  componentWillReceiveProps(nextProps: PropsType) {
    // This handles setting existing medium if you land directly on the edit photo route
    if (!this.existingMedium && nextProps.trips !== this.props.trips) {
      // Receiving new props, update existing media potentially
      const cm = this.getCurrentMedia(nextProps.trips)
      if (cm) {
        const { medium, state: stateUpdate } = cm
        this.existingMedium = medium
        this.setState(stateUpdate)
      }
    }
  }

  getInitialFormValues = () => ({
    caption: this.existingMedium ? this.existingMedium.caption || '' : '',
    description: this.existingMedium
      ? this.existingMedium.description || ''
      : '',
    date: dateFormat(
      this.existingMedium
        ? this.existingMedium.dateTime
        : dotty.get(this.state.photo, 'dateTime') || '',
      'yyyy-mm-dd'
    ),
    time: dateFormat(
      this.existingMedium
        ? this.existingMedium.dateTime
        : dotty.get(this.state.photo, 'dateTime') || '',
      'HH:MM'
    )
  })

  handleSubmit = async (values: any, { setSubmitting }: any) => {
    // @ts-ignore
    const imageMedia: ImageMediaItem = this.existingMedium || {
      type: MediaItemType.Image,
      id: uuidv1(),
      dateTime:
        values.date && values.time
          ? new Date(`${values.date} ${values.time}`)
          : new Date()
    }

    if (this.state.photo == null) {
      return
    }

    // The photo.file will only be there if a new photo was selected
    if (this.state.photo.file) {
      console.log('Uploading to Cloudinary')
      // Upload the picture to Cloudinary and wait for the URL to be sent back
      const cloudinaryResult = (await uploadToCloudinary(
        this.state.photo.file
      )) as any
      imageMedia.src = cloudinaryResult.secure_url
    }

    // Conditionally build location object based on whether it was provided or not
    const locationObj: any = {}
    if (this.state.coordinates) {
      locationObj.lat = this.state.coordinates.lat
      locationObj.lng = this.state.coordinates.lng
      imageMedia.location = locationObj
    }

    if (values.caption) {
      imageMedia.caption = values.caption
    } else {
      delete imageMedia.caption
    }
    if (values.description) {
      imageMedia.description = values.description
    } else {
      delete imageMedia.description
    }

    const tripId = this.props.match.params.tripId
    const trip = this.props.trips.find(t => t.id === tripId)

    if (this.existingMedium) {
      this.props.updateMedium(imageMedia, trip!)
    } else {
      this.props.addMedium(imageMedia, trip!)
    }

    setSubmitting(false)
    this.setState({
      submitted: true
    })
  }

  handleChoosePhotoClick = () => {
    if (this.uploadInput) {
      this.uploadInput.click()
    }
  }

  handleNewCoordinates = (coordinates: Coordinates) => {
    this.setState({ coordinates })
  }

  // When a user selects a photo, update our state with the base64 representation of it
  // to later submit to the Firebase DB
  handleNewFileInput = async (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const file = event.target.files[0]
    if (file) {
      this.setState({ loadingPhoto: true })
      const photo = await getPhotoDetails(file)
      this.setState({
        photo,
        loadingPhoto: false,
        coordinates: photo.coordinates || null
      })
    }
  }

  render() {
    const { tripId, mediaId } = this.props.match.params
    if (this.state.submitted) {
      return <Redirect to={`/trip/${tripId}/edit`} />
    }

    // The URL says we're editing a medium but we have yet to receive the medium from Redux,
    // so render a loading screen
    if (mediaId && !this.existingMedium) {
      return <LoadingScreen />
    }

    const { fields: fieldCopy } = copy.addMedia.photo
    return (
      <Wrapper>
        <Link to={`/trip/${tripId}/edit`}>
          <ExitButton />
        </Link>
        <Title medium bold>
          {this.existingMedium
            ? copy.addMedia.photo.existingButtonText
            : copy.addMedia.photo.newTitle}
        </Title>
        <Title>{copy.addMedia.photo.subtitle}</Title>
        {/* Exit button back to current trip catalog */}

        {/* Hidden input that we'll click when user hits the real button */}
        <input
          ref={el => {
            this.uploadInput = el
          }}
          hidden
          type="file"
          id="single"
          onChange={this.handleNewFileInput}
        />

        {this.state.photo == null && (
          <Button
            primary
            onClick={this.handleChoosePhotoClick}
            disabled={this.state.loadingPhoto}
          >
            {this.state.loadingPhoto ? 'Loading photo' : 'Choose Photo'}
          </Button>
        )}

        {/* Photo metadata form */}

        {this.state.photo != null && (
          <Formik
            initialValues={this.getInitialFormValues()}
            validate={Photo.validateForm}
            validateOnChange
            onSubmit={this.handleSubmit}
          >
            {({ touched, errors, isSubmitting, handleSubmit }) => (
              <PhotoForm onSubmit={handleSubmit}>
                <ImagePreviewWrapper>
                  <img src={this.state.photo.dataURL} />
                  <ReselectLink onClick={this.handleChoosePhotoClick}>
                    <Text color={colors.blue} underline>
                      Choose a different picture
                    </Text>
                  </ReselectLink>
                </ImagePreviewWrapper>
                <FormContent>
                  <div>
                    <Text bold>
                      {fieldCopy.caption.name}
                      <OptionalFlag />
                    </Text>
                    <Field
                      type="text"
                      name="caption"
                      component={FormikTextInput}
                      placeholder={fieldCopy.caption.placeholder}
                    />
                  </div>
                  <FormRow>
                    <div>
                      <Text bold>{fieldCopy.date.name}</Text>
                      <Field
                        type="date"
                        name="date"
                        component={FormikTextInput}
                      />
                    </div>
                    <div>
                      <Text bold>{fieldCopy.time.name}</Text>
                      <Field
                        type="time"
                        name="time"
                        component={FormikTextInput}
                      />
                    </div>
                    <ErrorMessage name="date" component={ErrorMessageDiv} />
                    <ErrorMessage name="time" component={ErrorMessageDiv} />
                  </FormRow>
                  <div>
                    <Text bold>
                      {fieldCopy.location.name}
                      <OptionalFlag />
                    </Text>
                    <LocationSelector
                      photoCoordinates={
                        this.state.photo
                          ? this.state.photo.coordinates
                          : undefined
                      }
                      onNewCoordinates={this.handleNewCoordinates}
                    />
                  </div>
                  <div>
                    <Text bold>
                      {fieldCopy.description.name}
                      <OptionalFlag />
                    </Text>
                    <Field
                      type="textarea"
                      name="description"
                      placeholder={fieldCopy.description.placeholder}
                      component={FormikTextarea}
                    />
                  </div>
                </FormContent>
                <Button
                  type="submit"
                  noRound
                  primary
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                  {isSubmitting
                    ? 'Uploading...'
                    : this.existingMedium
                      ? copy.addMedia.photo.existingButtonText
                      : copy.addMedia.photo.newButtonText}
                </Button>
              </PhotoForm>
            )}
          </Formik>
        )}
      </Wrapper>
    )
  }
}

export default connect(
  (state: any) => ({
    trips: state.trip
  }),
  { addMedium: actions.addMedium, updateMedium: actions.updateMedium }
)(Photo)
