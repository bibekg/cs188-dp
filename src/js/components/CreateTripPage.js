import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/index'
import copy from '../copy'
import Text from './Text'
import TextInput from './TextInput'
import Button from './Button'

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

const TripNameInput = styled.form`
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

const CreateTripPage = () => {
  const { title, subtitle, fields, submitButtonText } = copy.createTrip
  return (
    <Wrapper>
      <Title medium bold>
        {title}
      </Title>
      <Title>{subtitle}</Title>
      <TripNameInput>
        <div>
          <Text>{fields.title.name}</Text>
          <TextInput
            type="text"
            name="title"
            placeholder={fields.title.placeholder}
          />
        </div>
        <div>
          <Text>{fields.startDate.name}</Text>
          <TextInput type="date" name="startDate" />
        </div>
        <div>
          <Text>{fields.endDate.name}</Text>
          <TextInput type="date" name="endDate" />
        </div>
        <Button pinned primary>
          {submitButtonText}
        </Button>
      </TripNameInput>
    </Wrapper>
  )
}

export default CreateTripPage
