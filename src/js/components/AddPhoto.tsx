import * as React from 'react'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'

import TextInput from './TextInput'
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

class AddPhoto extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleValue: '',
      captionValue: '',
      submitted: false
    }
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
            <Text>{fields.caption.name}</Text>
            <TextInput
              type="text"
              name="caption"
              value={this.state.captionValue}
              onChange={this.handleChange}
              placeholder={fields.caption.placeholder}
            />
          </div>
          <div>
            <Text>{fields.upload.name}</Text>
            <input type="file" id="single" />
          </div>
          <Button pinned primary>
            {photoButtonText}
          </Button>
        </AddPhotoForm>
      </Wrapper>
    )
  }
}

export default AddPhoto
