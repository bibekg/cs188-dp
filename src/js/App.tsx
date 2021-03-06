// @flow

import * as React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

import LandingPage from './components/LandingPage'
import CreateTripPage from './components/CreateTripPage'
import TripPage from './components/TripPage'
import TripFeed from './components/TripFeed'
import TripViewer from './components/TripViewer'
import Photo from './components/Photo'
import Note from './components/Note'
import NotificationView from './components/NotificationView'

import { fonts } from './styles'
import * as actions from './actions'

// @ts-ignore
injectGlobal([
  `
    @import url('https://fonts.googleapis.com/css?family=Lora:400,700|Open+Sans:400,700');

    body {
        font-family: ${fonts['sans-serif']}, sans-serif;
        margin: 0;
        width: 100%;
        height: 100%;
        // overflow: hidden;
        overflow-y: scroll
        -webkit-overflow-scrolling: touch;
    }

    body.disable-scroll {
        overflow: hidden;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    #app {
      width: 100vw;
      height: 100vh;
    }
`
])

interface PropsType {
  getTrips: () => void
}

class App extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props)
    this.props.getTrips()
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/trip" component={TripFeed} />
          <Route exact path="/trip/new" component={CreateTripPage} />
          <Route path="/trip/:tripId/edit" component={TripPage} />
          <Route path="/trip/:tripId/view" component={TripViewer} />
          <Route path="/trip/:tripId/photo/:mediaId?" component={Photo} />
          <Route path="/trip/:tripId/note/:mediaId?" component={Note} />
          <Route path="/notification-demo" component={NotificationView} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default connect(
  null,
  { getTrips: actions.getTrips }
)(App)
