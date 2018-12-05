import * as React from 'react'
import styled from 'styled-components'

import Spinner from './Spinner'
import Text from './Text'
import { colors } from '../styles'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LoadingScreen = () => (
  <Wrapper>
    <Spinner />
    <Text bold medium color={colors.green}>
      Loading
    </Text>
  </Wrapper>
)

export default LoadingScreen
