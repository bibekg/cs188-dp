import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

// @ts-ignore
const wrapper = document.getElementById('app')

if (wrapper) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    wrapper
  )
}
