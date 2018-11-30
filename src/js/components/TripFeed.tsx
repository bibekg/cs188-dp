import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import TripItem from './TripItem'
import RectangularButton from './RectangularButton'
import MapOverview from './MapOverview'
import Text from './Text'

import copy from '../copy'
import { colors } from '../styles'
import { Trip } from '../type-defs/Trip'
import { averageTripLocation } from '../util/geo'
import { LocationDetails } from '../type-defs/MediaItem'

const TitleBar = styled.div`
  background-color: ${colors.brown};
  ${Text} {
    color: white;
  }
  padding: 10px 0;
  text-align: center;
`

const TripFeedContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const TripFeedMapWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 40%;
`

const TripFeedContent = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding-bottom: 85px;
`

interface PropsType {
  trips: Trip[]
  match: any
}

class TripFeed extends React.Component<PropsType> {
  render() {
    const { createTripButtonText } = copy.tripFeed

    const tripsToLocations = this.props.trips.reduce<
      Map<Trip, LocationDetails>
    >((acc, trip) => {
      const avgLoc = averageTripLocation(trip) as LocationDetails
      if (avgLoc && avgLoc.lat && avgLoc.lng) {
        acc.set(trip, avgLoc)
      }
      return acc
    }, new Map())

    return (
      <TripFeedContainer>
        <TitleBar>
          <Text medium bold>
            Your Past Trips
          </Text>
        </TitleBar>
        <TripFeedMapWrapper>
          <MapOverview
            markers={Array.from(tripsToLocations).map(
              ([innerTrip, averageLocation]) => ({
                key: innerTrip.id,
                title: innerTrip.name,
                position: averageLocation
              })
            )}
          />
        </TripFeedMapWrapper>
        <TripFeedContent>
          {[...this.props.trips]
            .sort((a, b) => {
              const timeDiff = a.startDate.valueOf() - b.startDate.valueOf()
              if (timeDiff > 0) {
                return -1
              } else if (timeDiff < 0) {
                return 1
              }
              return 0
            })
            .map(trip => (
              <TripItem key={trip.id} trip={trip} />
            ))}
        </TripFeedContent>
        <Link to="/trip/new">
          <RectangularButton primary>{createTripButtonText}</RectangularButton>
        </Link>
      </TripFeedContainer>
    )
  }
}

export default connect(
  (state: any) => ({
    trips: state.trip
  }),
  null
)(TripFeed)
