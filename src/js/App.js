// @flow

import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'

import HomePage from './components/HomePage'
import CreateTripPage from './components/CreateTripPage'
import TripPage from './components/TripPage'
import TripViewer from './components/TripViewer'

import { fonts } from './styles'

injectGlobal([
  `
    @import url('https://fonts.googleapis.com/css?family=Lora:400,700|Open+Sans:400,700');

    body {
        font-family: ${fonts['sans-serif']}, sans-serif;
        margin: 0;
        width: 100%;
        height: 100%;
    }

    body.disable-scroll {
        overflow: hidden;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }
`
])

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/trip/new" component={CreateTripPage} />
          <Route path="/trip/:tripId/edit" component={TripPage} />
          <Route path="/trip/:tripId/view" component={TripViewer} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
