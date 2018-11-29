import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import uuidv1 from 'uuid/v1'

import { Trip } from '../type-defs/Trip'
import copy from '../copy'
import Text from './Text'
import TextInput from './TextInput'
import Button from './Button'
import * as actions from '../actions'

const Wrapper = styled.div`
  text-align: center;
  padding: 10px;
`

const Title = styled(Text)`
  margin: 20px 0;
`

const TripNameForm = styled.form`
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
  createTrip: (trip: Trip) => any
}

interface StateType {
  titleValue: string
  startDateValue: string
  endDateValue: string
  submitted: boolean
}

class CreateTripPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      titleValue: '',
      startDateValue: '',
      endDateValue: '',
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
    this.submitToFirebase()
    return false
  }

  async submitToFirebase() {
    const { titleValue, startDateValue, endDateValue } = this.state
    const newTrip: Trip = {
      id: uuidv1(),
      name: titleValue,
      startDate: new Date(startDateValue),
      endDate: new Date(endDateValue)
    }
    await this.props.createTrip(newTrip)
    this.setState({
      submitted: true
    })
  }

  render() {
    if (this.state.submitted) {
      return <Redirect to="/trip/1/edit" />
    }

    const { title, subtitle, fields, submitButtonText } = copy.createTrip
    return (
      <Wrapper>
        <Title medium bold>
          {title}
        </Title>
        <Title>{subtitle}</Title>
        <TripNameForm onSubmit={this.handleSubmit}>
          <div>
            <Text>{fields.title.name}</Text>
            <TextInput
              type="text"
              name="title"
              value={this.state.titleValue}
              onChange={this.handleChange}
              placeholder={fields.title.placeholder}
            />
          </div>
          <div>
            <Text>{fields.startDate.name}</Text>
            <TextInput
              type="date"
              name="startDate"
              value={this.state.startDateValue}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Text>{fields.endDate.name}</Text>
            <TextInput
              type="date"
              name="endDate"
              value={this.state.endDateValue}
              onChange={this.handleChange}
            />
          </div>
          <Button pinned primary>
            {submitButtonText}
          </Button>
        </TripNameForm>
      </Wrapper>
    )
  }
}

export default connect(
  null,
  {
    createTrip: actions.createTrip
  }
)(CreateTripPage)
