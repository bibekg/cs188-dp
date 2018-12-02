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

const TripPageAddButton = styled(RectangularButton)`
  // padding: 15px 15px;
  // font-family: 'sans-serif';
  // font-size: 24px;
  // font-weight: bold;
  // letter-spacing: 0.8px;
  // color: ${colors.white};
  // background-color: ${colors.green};
  // flex-grow: 1;
`

const TitleBar = styled.div`
  padding: 10px;
  width: 100%;
  text-align: center;
  background-color: ${colors.brown};

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

  handleTripMediumClick = (id: string) => {
    this.setState({ activeMarkerId: id })
  }

  render() {
    const { tripId } = this.props.match.params
    const trip = this.props.trips.find(trip => trip.id === tripId)

    const tripsWithLocations = trip
      ? trip.media.filter(
          medium =>
            medium.location && medium.location.lat && medium.location.lng
        )
      : []

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
            markers={tripsWithLocations.map(loc => ({
              key: loc.id,
              title: loc.description,
              position: loc.location
            }))}
            activeMarkerId={this.state.activeMarkerId}
          />
        </TripPageMapWrapper>
        <TripPageContent>
          {trip.media &&
            [...trip.media]
              .sort((a, b) => {
                const timeDiff = a.dateTime.valueOf() - b.dateTime.valueOf()
                if (timeDiff > 0) {
                  return -1
                } else if (timeDiff < 0) {
                  return 1
                }
                return 0
              })
              .map(medium => (
                <MediaItemRow key={medium.id} mediaItem={medium} />
              ))}
        </TripPageContent>
        <TripPageAddMemory>
          <Link
            style={{ textDecoration: 'none', flexGrow: 1 }}
            to={`/trip/${tripId}/add-photo`}
          >
            <TripPageAddButton primary>
              <Text bold color={colors.white} medium>
                {copy.tripPage.addPhoto}
              </Text>
            </TripPageAddButton>
          </Link>

          <Link
            style={{ textDecoration: 'none', flexGrow: 1 }}
            to={`/trip/${tripId}/add-note`}
          >
            <TripPageAddButton primary>
              <Text bold color={colors.white} medium>
                {copy.tripPage.addNote}
              </Text>
            </TripPageAddButton>
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
