import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import MapOverview from './MapOverview'
import MediaItemRow from './MediaItemRow'
import Text from './Text'
import RectangularButton from './RectangularButton'

import copy from '../copy'
import { colors } from '../styles'
import { Trip } from '../type-defs/Trip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { MediaItem } from '../type-defs/MediaItem'

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
  flex-shrink: 0;
  width: 100%;
`

const TripPageContent = styled.div`
  flex-grow: 1;
  overflow: auto;
  padding-bottom: 60px;
  & > * {
    display: block;
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGrey};
    }
  }
`

const TripPageAddMemory = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-decoration: none;
`

const TitleBar = styled.div`
  padding: 10px;
  width: 100%;
  text-align: center;
  background-color: ${colors.brown};
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

interface PropsType {
  trips: Trip[]
}

interface StateType {
  activeMarkerId: string | null
}

class TripPage extends React.Component<PropsType, StateType> {
  state = {
    activeMarkerId: null
  }

  static hasLocationFilter = (medium: MediaItem) =>
    medium.location && medium.location.lat && medium.location.lng

  static chronologicalSort = (a: any, b: any) => {
    const timeDiff = a.dateTime.valueOf() - b.dateTime.valueOf()
    if (timeDiff > 0) {
      return -1
    } else if (timeDiff < 0) {
      return 1
    }
    return 0
  }

  handleTripMediumClick = (id: string) => {
    this.setState({ activeMarkerId: id })
  }

  render() {
    const { tripId } = this.props.match.params
    const trip = this.props.trips.find(trip => trip.id === tripId)
    if (!trip) {
      return null
    }

    const tripToRender = {
      ...trip,
      media: [...trip.media].sort(TripPage.chronologicalSort)
    }

    return trip ? (
      <TripPageContainer>
        <TitleBar>
          <Link to="/trip">
            <FontAwesomeIcon color={colors.white} icon={faArrowLeft} />
          </Link>
          <Text medium bold color={colors.white}>
            {trip.name}
          </Text>
          <Link to={`/trip/${tripId}/view`}>
            <FontAwesomeIcon icon={faPlay} color={colors.white} />
          </Link>
        </TitleBar>

        <TripPageMapWrapper>
          <MapOverview
            markers={tripToRender.media
              .filter(TripPage.hasLocationFilter)
              .map(loc => ({
                key: loc.id,
                title: loc.description,
                position: loc.location
              }))}
            activeMarkerId={this.state.activeMarkerId}
            showRoute
          />
        </TripPageMapWrapper>
        <TripPageContent>
          {tripToRender.media.map(medium => (
            <MediaItemRow key={medium.id} mediaItem={medium} />
          ))}
        </TripPageContent>
        <TripPageAddMemory>
          <Link
            style={{ textDecoration: 'none', flexGrow: 1 }}
            to={`/trip/${tripId}/add-photo`}
          >
            <RectangularButton primary>
              <Text bold color={colors.white} medium>
                {copy.tripPage.addPhoto}
              </Text>
            </RectangularButton>
          </Link>

          <Link
            style={{ textDecoration: 'none', flexGrow: 1 }}
            to={`/trip/${tripId}/add-note`}
          >
            <RectangularButton primary>
              <Text bold color={colors.white} medium>
                {copy.tripPage.addNote}
              </Text>
            </RectangularButton>
          </Link>
        </TripPageAddMemory>
      </TripPageContainer>
    ) : null
  }
}

export default connect(
  (state: any) => ({
    trips: state.trip
  }),
  null
)(TripPage)
