import * as React from 'react'
import styled from 'styled-components'
import { colors } from '../styles'

const OptionSelectorDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  margin-bottom: 10px;
  border: 2px solid ${colors.green};
  & > * {
    flex-grow: 1;
  }
`

const OptionItem = styled.div`
  background-color: ${props => {
    return props.selected ? colors.green : colors.white
  }};
  color: ${props => {
    return props.selected ? colors.white : colors.green
  }};
  padding: 4px;
  text-align: center;
  cursor: pointer;

  &:not(:last-child) {
    border-right: 2px solid ${colors.green};
  }
`

interface OptionItem {
  id: string
  text: string
}

interface PropsType {
  options: OptionItem[]
  selectedOptionId: string
  onChange: (optionId: string) => void
}

export default function OptionSelector(props: PropsType) {
  const { options, selectedOptionId, onChange } = props
  return (
    <OptionSelectorDiv>
      {options.map(option => (
        <OptionItem
          key={option.id}
          selected={option.id === selectedOptionId}
          onClick={() => onChange(option.id)}
        >
          {option.text}
        </OptionItem>
      ))}
    </OptionSelectorDiv>
  )
}
