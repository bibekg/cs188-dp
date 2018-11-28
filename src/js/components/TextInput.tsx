// @flow

import styled from 'styled-components'
import { rgba } from 'polished'
import { colors, fonts } from '../styles'
import { placeholderMixin } from '../styles/mixins'

export default styled.input`
  width: 100%;
  padding: 10px 5px;
  box-sizing: border-box;
  border: none;
  background-color: ${colors.offWhite};
  border: 2px solid ${rgba(colors.green, 0.1)};
  outline: none;
  font-size: 16px;
  font-weight: 300;
  font-family: ${fonts['sans-serif']};
  border-radius: 4px;

  &::placeholder {
    color: ${colors.mostlyBlack};
  }

  &:invalid {
    border-bottom-color: ${colors.red};
  }

  ${placeholderMixin(colors.darkGrey)};
`
