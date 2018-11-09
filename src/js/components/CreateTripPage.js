import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/index'
import Text from './Text'
import TextInput from './TextInput'

const Wrapper = styled.div`
  text-align: center;
  padding: 10px;
`
const TripNameInput = styled.form`
  text-align: left;
  display: flex;
  flex-direction: column;
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
`
const SubmitButton = styled.input`
  color: ${colors.black};
  background-color: ${colors.green};
`

const PageTitle = styled.div``
const CreateTripPage = () => {
  return (
    <Wrapper>
      <Text>Create Trip</Text>
      <TripNameInput>
        <div>
          <Text>Title</Text>
          <TextInput type="text" name="title" />
        </div>
        <div>
          <Text>Place</Text>
          <TextInput type="text" name="place" />
        </div>
        <div>
          <Text>Start Date</Text>
          <TextInput type="date" name="startDate" />
        </div>
        <div>
          <Text>End Date</Text>
          <TextInput type="date" name="endDate" />
        </div>
        <div>
          <Text>Upload Media</Text>
          <TextInput type="file" name="media" />
        </div>
        <SubmitButton type="submit" value="Submit" multiple />
      </TripNameInput>
    </Wrapper>
  )
}

export default CreateTripPage
