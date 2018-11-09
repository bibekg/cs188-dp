// @flow

import styled from 'styled-components'
import { colors, fonts } from '../styles'

const DEFAULT_COLOR = colors.grey

const getSize = props => (props.size ? props.size : 18)
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
