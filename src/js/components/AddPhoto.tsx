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
import { ImageMediaItem, MediaItemType } from '../type-defs/MediaItem'
import { Trip } from '../type-defs/Trip'
import { colors } from '../styles'
import Button from './Button'
import ExitButton from './ExitButton'
import { FormikTextInput, FormikTextarea } from './formik'
import TextInput from './TextInput'
import Text from './Text'

const Wrapper = styled.div`
  text-align: center;
  padding: 10px;
`

const Title = styled(Text)`
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

interface PropsType {
  trips: Trip[]
  match: any
  addMedium: (medium: ImageMediaItem, trip: Trip) => void
}

interface StateType {
  loadingPhoto: boolean
  photo: PhotoDetails | null
  submitted: boolean
}

class AddPhoto extends React.Component<PropsType, StateType> {
  uploadInput: HTMLInputElement | null = null

  static validateForm = (values: any) => {
    const errors: any = {}

    if (
      // logical XOR
      (values.latitude === '' && values.longitude !== '') ||
      (values.latitude !== '' && values.longitude === '')
    ) {
      errors.latitude = 'Either provide complete coordinates or none'
    } else {
      if (isNaN(Number(values.latitude))) {
        errors.latitude = 'Latitude must be a number'
      } else if (Math.abs(values.latitude) > 90) {
        errors.latitude = 'Latitude out of range'
      }

      if (isNaN(Number(values.longitude))) {
        errors.longitude = 'Longitude must be a number'
      } else if (Math.abs(values.longitude) > 180) {
        errors.longitude = 'Longitude out of range'
      }
    }

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

    this.state = {
      loadingPhoto: false,
      photo: null,
      submitted: false
    }
  }

  getInitialFormValues = () => ({
    caption: '',
    description: '',
    latitude: dotty.get(this.state.photo, 'coordinates.lat') || '',
    longitude: dotty.get(this.state.photo, 'coordinates.lng') || '',
    date: dateFormat(
      dotty.get(this.state.photo, 'dateTime') || '',
      'yyyy-mm-dd'
    ),
    time: dateFormat(dotty.get(this.state.photo, 'dateTime') || '', 'HH:MM')
  })

  handleSubmit = async (values: any, { setSubmitting }: any) => {
    // @ts-ignore
    const imageMedia: ImageMediaItem = {}
    imageMedia.type = MediaItemType.Image
    imageMedia.id = uuidv1()
    imageMedia.dateTime =
      values.date && values.time
        ? new Date(`${values.date} ${values.time}`)
        : new Date()

    if (this.state.photo == null) {
      return
    }

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

    imageMedia.location = locationObj
    imageMedia.caption = values.caption
    imageMedia.description = values.description

    const tripId = this.props.match.params.tripId
    const trip = this.props.trips.find(t => t.id === tripId)

    this.props.addMedium(imageMedia, trip!)

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

  // When a user selects a photo, update our state with the base64 representation of it
  // to later submit to the Firebase DB
  handleNewFileInput = async (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const file = event.target.files[0]
    if (file) {
      this.setState({ loadingPhoto: true })
      const photo = await getPhotoDetails(file)
      this.setState({ photo, loadingPhoto: false })
    }
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

        {this.state.photo && (
          <Formik
            initialValues={this.getInitialFormValues()}
            validate={AddPhoto.validateForm}
            validateOnChange
            onSubmit={this.handleSubmit}
          >
            {({ touched, errors, isSubmitting, handleSubmit }) => (
              <AddPhotoForm onSubmit={handleSubmit}>
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
                    <Text bold>{fields.caption.name}</Text>
                    <Field
                      type="text"
                      name="caption"
                      component={FormikTextInput}
                      placeholder={fields.caption.placeholder}
                    />
                  </div>
                  <FormRow>
                    <div>
                      <Text bold>{fields.latitude.name}</Text>
                      <Field
                        type="number"
                        name="latitude"
                        component={FormikTextInput}
                      />
                    </div>
                    <div>
                      <Text bold>{fields.longitude.name}</Text>
                      <Field
                        type="number"
                        name="longitude"
                        component={FormikTextInput}
                      />
                    </div>
                  </FormRow>
                  <ErrorMessage name="latitude" component={ErrorMessageDiv} />
                  <ErrorMessage name="longitude" component={ErrorMessageDiv} />
                  <FormRow>
                    <div>
                      <Text bold>{fields.date.name}</Text>
                      <Field
                        type="date"
                        name="date"
                        component={FormikTextInput}
                      />
                    </div>
                    <div>
                      <Text bold>{fields.time.name}</Text>
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
                    <Text bold>{fields.description.name}</Text>
                    <Field
                      type="textarea"
                      name="description"
                      placeholder={fields.description.placeholder}
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
                  {isSubmitting ? 'Uploading...' : photoButtonText}
                </Button>
              </AddPhotoForm>
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
  { addMedium: actions.addMedium }
)(AddPhoto)
