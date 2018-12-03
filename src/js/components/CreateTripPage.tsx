import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Formik, Field, ErrorMessage } from 'formik'
import uuidv1 from 'uuid/v1'

import { Trip } from '../type-defs/Trip'
import copy from '../copy'
import { colors } from '../styles'
import Text from './Text'
import TextInput from './TextInput'
import Button from './Button'
import * as actions from '../actions'
import ExitButton from './ExitButton'

const CustomTextInput = ({ field, form, ...props }: any) => (
  <TextInput {...field} {...props} />
)

const Wrapper = styled.div`
  text-align: center;
  padding: 10px;
`

const Title = styled(Text)`
  margin: 20px 0;
`

const Form = styled.form`
  text-align: left;
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
`

const ErrorMessageDiv = styled.div`
  color: ${colors.red};
`

interface PropsType {
  createTrip: (trip: Trip) => any
}

interface StateType {
  uuid: string
  submitted: boolean
}

class CreateTripPage extends React.Component<PropsType, StateType> {
  static initialValues = {
    name: '',
    startDate: '',
    endDate: ''
  }

  constructor(props: PropsType) {
    super(props)
    this.state = {
      uuid: '',
      submitted: false
    }
  }

  handleSubmit = async (values: any, { setSubmitting }: any) => {
    await this.submitToFirebase(values)
    setSubmitting(false)
  }

  async submitToFirebase(values: any) {
    const { name, startDate, endDate } = values
    const uuid = uuidv1()

    // @ts-ignore
    const newTrip: Trip = Trip.default()
    newTrip.id = uuid
    newTrip.name = name
    newTrip.startDate = new Date(startDate)
    newTrip.endDate = new Date(endDate)

    await this.props.createTrip(newTrip)

    this.setState({
      submitted: true,
      uuid: uuid
    })
  }

  validateForm = (values: any) => {
    const { name, startDate, endDate } = values
    const errors: any = {}
    if (name == null || name.trim().length === 0) {
      errors.name = 'A trip name is required'
    }

    if (new Date(startDate).toString() === 'Invalid Date') {
      errors.startDate = 'Invalid date'
    }

    if (new Date(endDate).toString() === 'Invalid Date') {
      errors.endDate = 'Invalid date'
    } else if (endDate.valueOf() <= startDate.valueOf()) {
      errors.endDate = 'End date must be after start date'
    }

    return errors
  }

  render() {
    if (this.state.submitted) {
      return <Redirect to={`/trip/${this.state.uuid}/edit`} />
    }

    const { createTrip: ctCopy } = copy
    return (
      <Wrapper>
        <Link to="/trip">
          <ExitButton />
        </Link>
        <Title medium bold>
          {ctCopy.title}
        </Title>
        <Title>{ctCopy.subtitle}</Title>

        {/* Separator */}

        <Formik
          initialValues={CreateTripPage.initialValues}
          validate={this.validateForm}
          validateOnBlur
          onSubmit={this.handleSubmit}
        >
          {({ touched, errors, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div>
                <Text bold>{ctCopy.fields.name.name}</Text>
                <Field
                  type="text"
                  name="name"
                  component={CustomTextInput}
                  placeholder={ctCopy.fields.name.placeholder}
                />
                <ErrorMessage name="name" component={ErrorMessageDiv} />
              </div>

              <div>
                <Text bold>{ctCopy.fields.startDate.name}</Text>
                <Field
                  type="date"
                  name="startDate"
                  component={CustomTextInput}
                />
                <ErrorMessage name="startDate" component={ErrorMessageDiv} />
              </div>

              <div>
                <Text bold>{ctCopy.fields.endDate.name}</Text>
                <Field type="date" name="endDate" component={CustomTextInput} />
                <ErrorMessage name="endDate" component={ErrorMessageDiv} />
              </div>

              <Button
                type="submit"
                pinned
                noRound
                primary
                disabled={
                  Object.keys(touched).length === 0 ||
                  isSubmitting ||
                  Object.keys(errors).length > 0
                }
              >
                {ctCopy.submitButtonText}
              </Button>
            </Form>
          )}
        </Formik>
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
