import * as React from 'react'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'
import { Formik, Field, ErrorMessage } from 'formik'
import { FormikTextInput } from './formik'

import TextInput from './TextInput'
import TextArea from './TextArea'
import Text from './Text'
import Button from './Button'
import ExitButton from './ExitButton'

import copy from '../copy'
import { colors } from '../styles'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { NoteMediaItem, MediaItem, MediaItemType } from '../type-defs/MediaItem'
import { Trip } from '../type-defs/Trip'
import { TIME_REGEXP } from '../util/datetime'

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

const ErrorMessageDiv = styled.div`
  color: ${colors.red};
`

const NoteForm = styled.form`
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
  trips: (trips: Trip) => any
  addMedium: (medium: MediaItem, trip: Trip) => any
}

interface StateType {
  submitted: boolean
}

class Note extends React.Component<PropsType, StateType> {
  static validateForm = (values: any) => {
    const { title, note, date, time } = values
    const errors: any = {}
    if (title == null || title.trim().length === 0) {
      errors.title = 'A note title is required'
    }

    if (note == null || note.trim().length === 0) {
      errors.note = 'A note description is required'
    }

    if (new Date(date).toString() === 'Invalid Date') {
      errors.date = 'Invalid date'
    }

    if (!TIME_REGEXP.test(values.time)) {
      errors.time = 'Invalid time'
    }

    return errors
  }

  static initialValues = {
    title: '',
    note: '',
    date: '',
    time: ''
  }

  constructor(props: PropsType) {
    super(props)
    this.state = {
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = async (values: any, { setSubmitting }: any) => {
    // @ts-ignore
    const noteMedia: NoteMediaItem = {}
    noteMedia.id = uuidv1()
    noteMedia.type = MediaItemType.Note

    noteMedia.title = values.title
    noteMedia.content = values.note
    noteMedia.dateTime = new Date(`${values.date} ${values.time}`)

    const { tripId } = this.props.match.params
    const trip: Trip = this.props.trips.find(trip => trip.id === tripId)

    this.props.addMedium(noteMedia, trip)

    setSubmitting(false)
    this.setState({
      submitted: true
    })
  }

  render() {
    const { tripId } = this.props.match.params
    if (this.state.submitted) {
      return <Redirect to={`/trip/${tripId}/edit`} />
    }

    const { title, subtitle, fields, noteButtonText } = copy.addMedia.note
    return (
      <Wrapper>
        <Link to={`/trip/${tripId}/edit`}>
          <ExitButton />
        </Link>
        <Title medium bold>
          {title}
        </Title>
        <Title>{subtitle}</Title>

        <Formik
          initialValues={Note.initialValues}
          validate={Note.validateForm}
          validateOnBlur
          onSubmit={this.handleSubmit}
        >
          {({ touched, errors, handleSubmit, isSubmitting }) => (
            <NoteForm onSubmit={handleSubmit}>
              <div>
                <Text bold>{fields.title.name}</Text>
                <Field
                  type="text"
                  name="title"
                  component={FormikTextInput}
                  placeholder={fields.title.placeholder}
                />
                <ErrorMessage name="title" component={ErrorMessageDiv} />
              </div>
              <div>
                <Text bold>{fields.note.name}</Text>
                <Field
                  type="textarea"
                  name="note"
                  component={FormikTextInput}
                  placeholder={fields.note.placeholder}
                />
                <ErrorMessage name="note" component={ErrorMessageDiv} />
              </div>
              <div>
                <Text bold>{fields.date.name}</Text>
                <Field type="date" name="date" component={FormikTextInput} />
                <ErrorMessage name="date" component={ErrorMessageDiv} />
              </div>

              <div>
                <Text bold>{fields.time.name}</Text>
                <Field type="time" name="time" component={FormikTextInput} />
                <ErrorMessage name="time" component={ErrorMessageDiv} />
              </div>

              <Button
                type="submit"
                pinned
                primary
                noRound
                disabled={
                  Object.keys(touched).length === 0 ||
                  isSubmitting ||
                  Object.keys(errors).length > 0
                }
              >
                {noteButtonText}
              </Button>
            </NoteForm>
          )}
        </Formik>
      </Wrapper>
    )
  }
}

export default connect(
  (state: any) => ({
    trips: state.trip
  }),
  {
    addMedium: actions.addMedium
  }
)(Note)
