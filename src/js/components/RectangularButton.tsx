// @flow

import styled from 'styled-components'
import Button from './Button'

const RectangularButton = styled(Button)`
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 0;
  width: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
  font-size: 30px;
  line-height: 30px;
`

export default RectangularButton
