// @flow

import styled from 'styled-components'
import { colors, fonts } from 'styles'
import { placeholderMixin } from 'styles/mixins'

export default styled.input`
  width: 100%;
  padding: 10px 5px;
  box-sizing: border-box;
  border: none;
  background-color: ${colors.white};
  border: 2px solid ${colors.green};
  outline: none;
  font-size: 16px;
  font-weight: 300;
  font-family: ${fonts['sans-serif']};

  &::placeholder {
    color: ${colors.grey};
  }

  &:invalid {
    border-bottom-color: ${colors.red};
  }

  ${placeholderMixin};
`
