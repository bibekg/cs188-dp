import * as React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { GOOGLE_API_KEY } from '../constants'
import { backgrounds } from 'polished'

const style = {
  width: '100%',
  height: '100%'
}

interface PropsType {
  markers: any[]
  google: any
}

interface StateType {}

class MapOverview extends React.Component<PropsType, StateType> {
  static defaultProps = {
    markers: []
  }

  render() {
    // Bound the map around the trip pins that we will render
    const bounds = new this.props.google.maps.LatLngBounds()
    this.props.markers.forEach(markerProps => {
      bounds.extend(markerProps.position)
    })

    return (
      <Map google={this.props.google} zoom={14} style={style} bounds={bounds}>
        {this.props.markers.map(markerProps => (
          <Marker {...markerProps} />
        ))}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapOverview)
