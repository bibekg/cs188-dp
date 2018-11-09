// @flow

import * as React from 'react'
import styled from 'styled-components'
import Sun from './Sun'

import { colors } from '../styles/index'

export default () => {
  const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
  `

  const LandingCenter = styled.div`
    position: absolute;
    top: 25vh;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
  `

  const LandingCenterButtons = LandingCenter.extend`
    display: flex;
    flex-direction: row;
  `

  const ButtonBase = styled.div`
    margin-left: 10px;
    padding: 0.8em 1.2em 0.8em 1.2em;
    border-radius: 1.5em;
    border-width: 4px;
    border-style: solid;
    font-size: 18px;
    letter-spacing: 1px;
    cursor: pointer;
  `

  const LandingText = styled.span`
    margin-top: 10px;
    font-size: 60px;
  `

  const LoginButton = ButtonBase.extend`
    color: ${colors.white};
    background-color: ${colors.blue};
    border: none;

    &:hover {
      color: ${colors.blue};
      background-color: ${colors.white};
    }
  `
  const SignUpButton = ButtonBase.extend`
    color: ${colors.white};
    background-color: ${colors.darkgrey};
    border: none;

    &:hover {
      color: ${colors.darkgrey};
      background-color: ${colors.white};
    }
  `

  return (
    <Container>
      <LandingCenter>
        <Sun />
        <LandingText>Memoricle</LandingText>
        <LandingCenterButtons>
          <LoginButton>Log in</LoginButton>
          <SignUpButton>Sign up</SignUpButton>
        </LandingCenterButtons>
      </LandingCenter>
    </Container>
  )
}
