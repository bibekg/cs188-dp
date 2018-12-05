import * as React from 'react'
import styled from 'styled-components'
import Text from '../components/Text'

import { Link } from 'react-router-dom'
import { colors } from '../styles/index'

import background from '../../assets/notification-background.jpeg'
import titleIcon from '../../assets/sun.png'
import { rgba } from 'polished'

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`
const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`
const NotificationContainer = styled.div`
  box-shadow: 0 1px 6px 0 ${rgba(colors.mostlyBlack, 0.28)};
  width: calc(100% - 10px);
  position: fixed;
  top: 5px;
  left: 5px;
  padding: 15px;
  border-radius: 5px;
  background: ${colors.offWhite};
  img {
    width: 30px;
    height: 30px;
  }
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const NotificationView = props => {
  return (
    <div>
      <Link
        style={{ textDecoration: 'none' }}
        to="/trip/cb171710-f471-11e8-b405-895a5285bb23/edit"
      >
        <NotificationContainer>
          <Header>
            <HeaderLeft>
              <img src={titleIcon} /> {'   '}
              <Text> MEMORICLE</Text>
            </HeaderLeft>
            <Text>now</Text>
          </Header>
          <Text bold>Add a photo to your trip!</Text>
          <Text>Would you link to add to your trip "A Week in Utah"?</Text>
        </NotificationContainer>
      </Link>
      <ImageWrapper>
        <Image src={background} alt="background" />
      </ImageWrapper>
    </div>
  )
}

export default NotificationView
