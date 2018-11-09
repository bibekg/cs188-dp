import * as React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { GOOGLE_API_KEY } from '../constants'

const style = {
  width: '100%',
  height: '43%'
}

class MapOverview extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14} style={style}>
        <Marker onClick={this.onMarkerClick} name={'Current location'} />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_API_KEY
})(MapOverview)
