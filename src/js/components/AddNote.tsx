import * as React from 'react'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'

import TextInput from './TextInput'
import TextArea from './TextArea'
import Text from './Text'
import Button from './Button'
import ExitButton from './ExitButton'

import copy from '../copy'
import { connect } from 'react-redux'

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

class AddNote extends React.Component {
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
              type="text"
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

export default AddNote
