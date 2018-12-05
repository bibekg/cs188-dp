import styled from 'styled-components'
import { colors } from '../styles'

const OptionalFlag = styled.span`
  &:after {
    color: ${colors.grey};
    content: '(OPTIONAL)';
    position: relative;
    left: 5px;
    font-size: 0.8em;
  }
`

export default OptionalFlag
