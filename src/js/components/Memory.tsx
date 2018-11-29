import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors } from '../styles/index'
import { MediaItemType, MediaItem } from '../type-defs/MediaItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faScroll } from '@fortawesome/free-solid-svg-icons'

const MemoryContainer = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid ${colors.black};
`

const Memory = props => {
  const { memory } = props

  return (
    <MemoryContainer>
      {memory.type === MediaItemType.Image ? (
        <FontAwesomeIcon icon={faImage} size="2x" />
      ) : memory.type === MediaItemType.Note ? (
        <FontAwesomeIcon icon={faScroll} size="2x" />
      ) : null}
    </MemoryContainer>
  )
}

export default Memory
