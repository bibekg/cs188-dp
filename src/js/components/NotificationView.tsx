import * as React from 'react'
import styled from 'styled-components'
import Text from '../components/Text'

import { Link } from 'react-router-dom'
import { colors } from '../styles/index'

import background from '../../assets/notification-background.jpeg'
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

const Logo = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  background-color: ${colors.green};
  border-radius: 5px;
`

const NotificationContainer = styled.div`
  box-shadow: 0 1px 6px 0 ${rgba(colors.mostlyBlack, 0.28)};
  width: calc(100% - 10px);
  position: fixed;
  top: ${props => (props.showing ? 5 : -200)}px;
  transition: 0.5s ease top;
  left: 5px;
  padding: 15px;
  border-radius: 5px;
  background: ${colors.offWhite};
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  & > :first-child {
    margin-right: 5px;
  }
`

interface PropsType {}

interface StateType {
  showing: boolean
}

class NotificationView extends React.Component<PropsType, StateType> {
  state = {
    showing: false
  }

  constructor(props: PropsType) {
    super(props)
    this.state = {
      showing: false
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({
        showing: true
      })
    }, 3000)
  }

  render() {
    return (
      <div>
        <Link
          style={{ textDecoration: 'none' }}
          to="/trip/cb171710-f471-11e8-b405-895a5285bb23/edit"
        >
          <NotificationContainer showing={this.state.showing}>
            <Header>
              <HeaderLeft>
                <Logo>M</Logo>
                <Text> MEMORICLE</Text>
              </HeaderLeft>
              <Text>now</Text>
            </Header>
            <Text bold>Add a photo to your trip!</Text>
            <Text>
              You haven't added too many photos to your "A Week in Utah" trip
              yet. Add one now to get the ball rolling.
            </Text>
          </NotificationContainer>
        </Link>
        <ImageWrapper>
          <Image src={background} alt="background" />
        </ImageWrapper>
      </div>
    )
  }
}

export default NotificationView
