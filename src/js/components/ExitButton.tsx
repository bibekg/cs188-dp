import * as React from 'react'

import styled from 'styled-components'
import { colors } from '../styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const ExitButtonWrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  color: ${colors.black};
`

const ExitButton = props => (
  <ExitButtonWrapper>
    <FontAwesomeIcon icon={faWindowClose} size="2x" />
  </ExitButtonWrapper>
)

export default ExitButton
