import * as React from 'react'
import styled from 'styled-components'

import TripItem from './TripItem'
import MapGL from 'react-map-gl'
import mock from '../mocks/mock'

import { MAPBOX_TOKEN, MAPBOX_STYLE } from '../constants'
import { colors } from '../styles/index'

const TripFeedContainer = styled.div`
  display: relative;
  width: 100vw;
  height: 100vh;
`

const TripFeedMapWrapper = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 40%;
`

const ButtonBase = styled.div`
  margin-left: 10px;
  padding: 0.8em 1.2em 0.8em 1.2em;
  border-radius: 1.5em;
  border-width: 4px;
  border-style: solid;
  font-size: 18px;
  letter-spacing: 1px;
  cursor: pointer;
  text-align: center;
`

const CreateNewTripButton = ButtonBase.extend`
  color: ${colors.white};
  background-color: ${colors.blue};
  border: none;
  margin-top: 25px;

  &:hover {
    color: ${colors.blue};
    background-color: ${colors.white};
  }
`

class TripFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    }
  }

  render() {
    const { tripId } = this.props.match.params
    return (
      <TripFeedContainer>
        <TripFeedMapWrapper>Map Goes here!</TripFeedMapWrapper>
        {/* will have to map all parts of mock for TripItem */}
        {Object.keys(mock).map(id => (
          <TripItem
            key={id}
            name={mock[id].name}
            startDate={mock[id].startDate}
            endDate={mock[id].endDate}
          />
        ))}
        <CreateNewTripButton>Create New Trip</CreateNewTripButton>
      </TripFeedContainer>
    )
    // <MapGL mapStyle={MAPBOX_STYLE} mapboxApiAccessToken={MAPBOX_TOKEN} />
  }
}

export default TripFeed
