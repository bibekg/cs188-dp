import * as React from 'react'
import { Map, Marker, GoogleApiWrapper, MapProps } from 'google-maps-react'
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
  mapReference: google.maps.Map | null

  constructor(props: PropsType) {
    super(props)
    this.mapReference = null
  }

  static defaultProps = {
    markers: []
  }

  handleMapReady = (
    mapProps: MapProps | undefined,
    map: google.maps.Map | undefined
  ) => {
    if (map) {
      this.mapReference = map
    }

    this.updateMap()
  }

  updateMap() {
    if (this.mapReference) {
      // Bound the map around the trip pins that we will render
      const bounds = new this.props.google.maps.LatLngBounds()
      this.props.markers.forEach(markerProps => {
        bounds.extend(markerProps.position)
      })

      this.mapReference.fitBounds(bounds)
    }
  }

  componentDidUpdate() {
    this.updateMap()
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={style}
        onReady={this.handleMapReady}
      >
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
