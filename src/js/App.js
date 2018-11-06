// @flow

import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'

import HelloWorld from './components/HelloWorld'
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
    return <HelloWorld />
  }
}

export default App
