import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import MapOverview from './MapOverview'
import MediaItemRow from './MediaItemRow'
import Text from './Text'
import BackArrow from './BackArrow'

import copy from '../copy'
import { colors } from '../styles'
import { Trip } from '../type-defs/Trip'

const TripPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100wh;
  height: 100vh;
  text-align: center;
`

const TripPageMapWrapper = styled.div`
  position: relative;
  height: 40%;
  width: 100%;
`

const TripPageContent = styled.div`
  flex-grow: 1;
  overflow: auto;
`

const TripPageAddMemory = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-decoration: none;
`

const TripPageAddButton = styled.div`
  padding: 15px 15px;
  font-family: 'sans-serif';
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.8px;
  color: ${colors.white};
  background-color: ${colors.green};
  flex-grow: 1;
`

const TitleBar = styled.div`
  padding: 10px;
  width: 100%;
  text-align: center;
  background-color: ${colors.brown};
`

interface PropsType {
  trips: Trip[]
}

const TripPage = (props: PropsType) => {
  const { tripId } = props.match.params
  const trip = props.trips.find(trip => trip.id === tripId)

  const tripsWithLocations = trip
    ? trip.media.filter(
        medium => medium.location && medium.location.lat && medium.location.lng
      )
    : []

  return trip ? (
    <TripPageContainer>
      <Link to="/trip">
        <BackArrow color={colors.white} />
      </Link>
      <TitleBar>
        <Text medium bold color={colors.white}>
          {trip.name}
        </Text>
      </TitleBar>
      <TripPageMapWrapper>
        <MapOverview
          markers={tripsWithLocations.map(loc => ({
            key: loc.id,
            title: loc.description,
            position: loc.location
          }))}
        />
      </TripPageMapWrapper>
      <TripPageContent>
        {trip.media &&
          trip.media.map(medium => (
            <MediaItemRow key={medium.id} mediaItem={medium} />
          ))}
      </TripPageContent>
      <TripPageAddMemory>
        <Link
          style={{ textDecoration: 'none', flexGrow: 1 }}
          to={`/trip/${tripId}/add-photo`}
        >
          <TripPageAddButton color="green">
            <Text bold color={colors.white} medium>
              {copy.tripPage.addPhoto}
            </Text>
          </TripPageAddButton>
        </Link>

        <Link
          style={{ textDecoration: 'none', flexGrow: 1 }}
          to={`/trip/${tripId}/add-note`}
        >
          <TripPageAddButton color="blue">
            <Text bold color={colors.white} medium>
              {copy.tripPage.addNote}
            </Text>
          </TripPageAddButton>
        </Link>
      </TripPageAddMemory>
    </TripPageContainer>
  ) : (
    <div>Trip is undefined</div>
  )
}

export default connect(
  (state: any) => ({
    trips: state.trip
  }),
  null
)(TripPage)
