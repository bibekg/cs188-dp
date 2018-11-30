import * as React from 'react'
import { Map, Marker, GoogleApiWrapper, MapProps } from 'google-maps-react'
import { GOOGLE_API_KEY } from '../constants'

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

    this.boundToMarkers()
  }

  boundToMarkers() {
    if (this.mapReference) {
      // Bound the map around the trip pins that we will render
      const bounds = new this.props.google.maps.LatLngBounds()
      this.props.markers.forEach(markerProps => {
        bounds.extend(markerProps.position)
      })

      // Don't zoom in too far on only one marker
      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        const extendPoint1 = new google.maps.LatLng(
          bounds.getNorthEast().lat() + 0.01,
          bounds.getNorthEast().lng() + 0.01
        )
        const extendPoint2 = new google.maps.LatLng(
          bounds.getNorthEast().lat() - 0.01,
          bounds.getNorthEast().lng() - 0.01
        )
        bounds.extend(extendPoint1)
        bounds.extend(extendPoint2)
      }

      this.mapReference.fitBounds(bounds)
    }
  }

  componentDidUpdate() {
    this.boundToMarkers()
  }

  render() {
    return (
      <Map google={this.props.google} onReady={this.handleMapReady}>
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
