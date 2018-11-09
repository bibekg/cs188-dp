import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles/index'

const Wrapper = styled.div`
  text-align: center;
`
const TripNameInput = styled.form`
  text-align: left;
  display: flex;
  flex-direction: column;
  text-align: center;
`
const SubmitButton = styled.input`
  color: ${colors.black};
  background-color: ${colors.green};
`
const FormInput = styled.input`
  border-style: solid;
  margin-bottom: 75px;
`

const PageTitle = styled.div``
const CreateTripPage = () => {
  return (
    <Wrapper>
      Create Trip
      <TripNameInput>
        Title: <FormInput type="text" name="title" />
        Place: <FormInput type="text" name="place" />
        Start Date: <FormInput type="date" name="startDate" />
        End Date: <FormInput type="date" name="endDate" />
        Upload Media: <FormInput type="file" name="media" />
        <SubmitButton type="submit" value="Submit" multiple />
      </TripNameInput>
    </Wrapper>
  )
}
export default CreateTripPage
