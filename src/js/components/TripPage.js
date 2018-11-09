import React from 'react'
import { Route } from 'react-router-dom'

const TripPage = props => {
  const { tripId } = props.match.params
  return <div>Trip page for trip with id {tripId}</div>
}

export default TripPage
