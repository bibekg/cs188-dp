import * as React from 'react'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'

import TextInput from './TextInput'
import TextArea from './TextArea'
import Text from './Text'
import Button from './Button'
import ExitButton from './ExitButton'

import copy from '../copy'
import { connect } from 'react-redux'
import { addMedia } from '../actions'
import * as actions from '../actions'
import { NoteMediaItem, MediaItem, MediaItemType } from '../type-defs/MediaItem'
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

const AddNoteForm = styled.form`
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
  titleValue: string
  noteValue: string
  submitted: boolean
}

class AddNote extends React.Component<PropsType, StateType> {
  constructor(props) {
    super(props)
    this.state = {
      titleValue: '',
      noteValue: '',
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event: React.SyntheticEvent<any>) {
    const { name, value } = event.target
    this.setState({
      [`${name}Value`]: value
    })
  }

  handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    this.updateFirebase()
    this.setState({
      submitted: true
    })
    return false
  }

  async updateFirebase() {
    const { tripId } = this.props.match.params
    const trip: Trip = this.props.trips.find(trip => trip.id === tripId)
    const uuid = uuidv1()
    const { titleValue, noteValue } = this.state
    const media = {
      id: uuid,
      title: titleValue,
      description: noteValue,
      type: MediaItemType.Note
    }

    await this.props.addMedium(media, trip)

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
        <AddNoteForm onSubmit={this.handleSubmit}>
          <div>
            <Text>{fields.title.name}</Text>
            <TextInput
              required
              type="text"
              name="title"
              value={this.state.titleValue}
              onChange={this.handleChange}
              placeholder={fields.title.placeholder}
            />
          </div>
          <div>
            <Text>{fields.note.name}</Text>
            <TextArea
              required
              name="note"
              value={this.state.noteValue}
              onChange={this.handleChange}
              placeholder={fields.note.placeholder}
            />
          </div>
          <Button pinned primary>
            {noteButtonText}
          </Button>
        </AddNoteForm>
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
)(AddNote)
