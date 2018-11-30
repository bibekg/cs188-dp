// @flow

import styled from 'styled-components'
import { colors, fonts } from '../styles'

const DEFAULT_COLOR = colors.darkGrey
const DEFAULT_SIZE = 14
const MEDIUM_SIZE = 20
const LARGE_SIZE = 28

const getSize = props => {
  if (props.size) {
    return props.size
  } else {
    if (props.medium) {
      return MEDIUM_SIZE
    } else if (props.large) {
      return LARGE_SIZE
    }
  }
  return DEFAULT_SIZE
}

const getColor = props =>
  props.color ? props.color : props.light ? colors.grey : DEFAULT_COLOR

export default styled.div`
    font-size: ${getSize}px;
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
    line-height: 1.37em;
    color: ${getColor};
    ${props => props.center && 'text-align: center;'}
    text-decoration: ${props => (props.underline ? 'underline' : 'none')};
    cursor: ${props => (props.pointer ? 'pointer' : 'inherit')};
    text-align: ${props => (props.center ? 'center' : 'inherit')};
    font-family: ${props =>
      props.serif
        ? `${fonts.serif}, serif`
        : `${fonts['sans-serif']}, sans-serif`};
    font-style: ${props => (props.italic ? 'italic' : 'normal')};
`
