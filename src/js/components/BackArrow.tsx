import * as React from 'react'

import styled from 'styled-components'
import { colors } from '../styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Wrapper = styled.div`
  color: ${props => props.color};
`

const BackArrow = props => (
  <Wrapper color={props.color}>
    <FontAwesomeIcon icon={faArrowLeft} size="2x" />
  </Wrapper>
)

export default BackArrow
