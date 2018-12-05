import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import styled from 'styled-components'

import TripItem from './TripItem'
import RectangularButton from './RectangularButton'
import MapOverview from './MapOverview'
import Text from './Text'

import copy from '../copy'
import { colors } from '../styles'
import { Trip } from '../type-defs/Trip'
import { averageTripLocation } from '../util/geo'
import {
  LocationDetails,
  MediaItemType,
  ImageMediaItem
} from '../type-defs/MediaItem'
import TextInput from './TextInput'

const TitleBar = styled.div`
  background-color: ${colors.brown};
  ${Text} {
    color: white;
  }
  padding: 10px 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const TripFeedContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const SearchBarWrapper = styled.div`
  padding: 5px;
  background-color: ${colors.lightGrey};
`

const TripFeedMapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 40%;
  flex-shrink: 0;
`

const TripFeedContent = styled.div`
  flex-grow: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  & > * {
    display: block;
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGrey};
    }
  }
`

interface PropsType {
  trips: Trip[]
  match: any
}

interface StateType {
  clickedMarker: Trip | null
  tripSearchValue: string
}

interface TripMetaData {
  avgLoc?: LocationDetails
  image?: string
}
class TripFeed extends React.Component<PropsType, StateType> {
  state = {
    clickedMarker: null,
    tripSearchValue: ''
  }

  static sortTrips = (a: Trip, b: Trip) => {
    const timeDiff =
      (a.startDate ? a.startDate.valueOf() : 0) -
      (b.startDate ? b.startDate.valueOf() : 0)
    if (timeDiff > 0) {
      return -1
    } else if (timeDiff < 0) {
      return 1
    }
    return 0
  }

  handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    const proposedKey = `${name}Value`
    if (this.state.hasOwnProperty(proposedKey)) {
      // @ts-ignore
      this.setState({ [proposedKey]: value })
    }
  }

  render() {
    if (this.state.clickedMarker != null) {
      return <Redirect to={`/trip/${this.state.clickedMarker.id}/edit`} />
    }

    const { createTripButtonText } = copy.tripFeed
    const { trips } = this.props
    const { tripSearchValue } = this.state

    const filteredTrips = trips.filter(t =>
      t.name!.toLowerCase().includes(tripSearchValue.toLowerCase())
    )

    const tripsToMetaData = filteredTrips.reduce<Map<Trip, TripMetaData>>(
      (acc, trip) => {
        const metaData: TripMetaData = {}
        const avgLoc = averageTripLocation(trip) as LocationDetails
        if (avgLoc && avgLoc.lat && avgLoc.lng) {
          metaData.avgLoc = avgLoc
          const potentialIconImage = trip.media
            .filter(medium => medium.type === MediaItemType.Image)
            .shift()
          if (potentialIconImage != null) {
            metaData.image = (potentialIconImage as ImageMediaItem).src
          }
          acc.set(trip, metaData)
        }
        return acc
      },
      new Map()
    )

    return (
      <TripFeedContainer>
        <TitleBar>
          <Text medium bold>
            Your Past Trips
          </Text>
        </TitleBar>
        <TripFeedMapWrapper>
          <MapOverview
            markers={Array.from(tripsToMetaData).map(
              ([innerTrip, { avgLoc, image }]) => {
                const props: any = {
                  key: innerTrip.id,
                  title: innerTrip.name,
                  onClick: () => this.setState({ clickedMarker: innerTrip })
                }
                if (avgLoc) {
                  props.position = avgLoc
                }
                if (image) {
                  props.icon = image
                }
                return props
              }
            )}
          />
        </TripFeedMapWrapper>
        <SearchBarWrapper>
          <TextInput
            name="tripSearch"
            value={this.state.tripSearchValue}
            onChange={this.handleChange}
            placeholder={copy.tripFeed.searchBox.placeholder}
          />
        </SearchBarWrapper>
        <TripFeedContent>
          {filteredTrips.sort(TripFeed.sortTrips).map(trip => (
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
