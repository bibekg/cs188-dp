import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { colors } from '../styles/index'
import { MediaItemType, MediaItem } from '../type-defs/MediaItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faScroll } from '@fortawesome/free-solid-svg-icons'

import { fonts } from '../styles/index'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-bottom: 1px solid ${colors.black};
`

const Media = styled.div`
  font-size: ${fonts.medium};
  font-weight: bold;
`

const Note = styled(Media)`
  margin-left: 20px;
`

const Image = styled(Media)`
  margin-left: 28px;
`

const Memory = props => {
  const { memory } = props

  return (
    <div>
      {memory.type === MediaItemType.Image ? (
        <Container>
          <FontAwesomeIcon icon={faImage} size="2x" />
          <Image>{memory.description}</Image>
        </Container>
      ) : memory.type === MediaItemType.Note ? (
        <Container>
          <FontAwesomeIcon icon={faScroll} size="2x" />
          <Note>{memory.title}</Note>
        </Container>
      ) : null}
    </div>
  )
}

export default Memory
