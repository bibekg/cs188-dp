// @flow

import styled from 'styled-components'
import { colors, fonts } from '../styles'

const getBackgroundColor = props => {
  if (props.disabled) {
    return colors.lightGrey
  }
  if (props.warning) {
    return colors.white
  } else return props.primary ? colors.green : colors.white
}

const getBorderColor = props => {
  if (props.disabled) {
    return colors.white
  }
  if (props.warning) {
    return colors.red
  } else return props.white ? colors.white : colors.green
}

const getTextColor = props => {
  if (props.disabled) {
    return colors.white
  }
  if (props.warning) {
    return colors.red
  } else return props.primary ? colors.white : colors.green
}

const Button = styled.button`
  border-radius: ${props => (props.noRound ? 0 : 50)}px;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 0.8px;
  padding: 7px 20px;
  text-align: center;
  font-family: ${fonts['sans-serif']};
  text-transform: uppercase;
  background-color: ${props => getBackgroundColor(props)};
  border: solid 2px ${props => getBorderColor(props)};
  color: ${props => getTextColor(props)};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  transition: 0.3s ease transform;

  ${props =>
    props.pinned &&
    `
    position: fixed;
    left: 0;
    bottom: 0;
    border-radius: 0;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
  `} &:focus {
    outline: none;
  }
`
export default Button
