import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import dateFormat from 'dateformat'

import { MediaItemType, ImageMediaItem, NoteMediaItem } from '../type-defs/MediaItem'
import Text from './Text'
import Button from './Button'
import { Trip } from '../type-defs/Trip'
import { colors } from '../styles'

const Title = styled(Text)`
  margin-bottom: 30px;
`

const TotalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`
const ExitButton = styled(Button)

const NavButton = styled(Button)`
  visibility: ${props => props.invisible ? 'hidden': 'visible'};
`

const BlurBackground = styled.div`
  z-index: 1;

  background: url("${props => props.image}");
  background-position: center;
  background-size: cover;

  filter: blur(5px) brightness(0.7);
  position: absolute;

  // Make the picture larger than its space so the blur radius
  // edges don't stand out
  top: -20px;
  left: -20px;
  height: calc(100% + 40px);
  width: calc(100% + 40px);
`

const NoteWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`

const NoteText = styled.div`
  padding: 20px;
`

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`

const ImageWithDescriptionWrapper = styled(TotalWrapper)`
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  & > * {

    // Image
    &:nth-child(1) {
      height: 50%;
      position: relative;
      z-index: 0;
    }

    // Note text details
    &:nth-child(2) {
      position: relative;
      z-index: 1;
      background-color: ${colors.white};
      flex-grow: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      padding: 20px;
    }

    &:nth-child(3) {
      flex-shrink: 0;
    }
  }
`

const ViewerWrapper = styled.div`
  position: relative;
  z-index: 2;

  width: 100%;
  height: 100%;
  ${props => (props.image ? `background-image: url(${props.image})` : '')};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const NoteContentSection = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  ${Text} {
    color: white;
  }
  padding: 20px;
  margin: 10px;
  ${'' /* box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.5); */}

  > *:not(:last-child) {
    margin-bottom: 8px;
  }
`

interface PropsType {
  trips: Trip[]
}

interface StateType {
  step: number
}

class TripViewer extends React.Component<PropsType, StateType> {
  state = {
    step: 0
  }

  constructor(props: PropsType) {
    super(props)
    this.goNext = this.goNext.bind(this)
    this.goBack = this.goBack.bind(this)
    this.exit = this.exit.bind(this)
  }

  goBack() {
    if (this.isOnFirstStep()) {
      this.setState({ step: -1 })
      return
    }
    let prevStepIndex = this.state.step - 1

    this.setState({
      step: prevStepIndex
    })
  }

  currentTrip() {
    const { tripId } = this.props.match.params
    const trip = this.props.trips.find(trip => trip.id === tripId)
    return trip!
  }

  exit() {
    this.setState({ step: -1 })
  }

  goNext() {
    if (this.isOnLastStep()) {
      this.setState({ step: -1 })
      return
    }
    let nextStepIndex = this.state.step + 1

    this.setState({
      step: nextStepIndex
    })
  }

  isOnLastStep() {
    return this.state.step === this.currentTrip().media.length - 1
  }

  isOnFirstStep() {
    return this.state.step === 0
  }

  renderNavigationController() {
    return (
      <NavigationContainer>
        <NavButton invisible={this.isOnFirstStep()} onClick={this.goBack}>Back</NavButton>
        <Button warning onClick={this.exit}>
          Exit
        </Button>
        <NavButton primary onClick={this.goNext}>
          {this.isOnLastStep() ? 'Finish' : 'Next'}
        </NavButton>
      </NavigationContainer>
    )
  }

  renderImageMedium(medium: ImageMediaItem) {

    if (medium.description) {
      return (
        <ImageWithDescriptionWrapper>
          <TotalWrapper>
            <BlurBackground image={medium.src} />
            <ViewerWrapper image={medium.src} />
          </TotalWrapper>
          <div>
            <Text bold>{medium.caption}</Text>
            <Text italic>{dateFormat(medium.dateTime, 'm/d/yy h:MM tt')}</Text>
            <NoteContentSection>
              {medium.description.split('\n').map((paragraph, i) => (
                <Text key={i}>{paragraph}</Text>
              ))}
            </NoteContentSection>
          </div>
          {this.renderNavigationController()}
        </ImageWithDescriptionWrapper>
      )
    } else {
      return (
        <TotalWrapper>
          <BlurBackground image={medium.src} />
          <ViewerWrapper image={medium.src}>
            <Overlay>
              <Text bold>{medium.caption}</Text>
              <Text italic>{dateFormat(medium.dateTime, 'm/d/yy h:MM tt')}</Text>
              {medium.location && medium.location.name && <Text>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />{' '}
                {medium.location.name}
              </Text>}
            </Overlay>
            {this.renderNavigationController()}
          </ViewerWrapper>
        </TotalWrapper>
      )
    }
  }

  renderNoteMedium(medium: NoteMediaItem) {
    return (
      <TotalWrapper>
        <NoteWrapper>
          <NoteText>
            <Title large bold>
              {medium.title}
            </Title>
            <NoteContentSection>
              {medium.content &&
                medium.content
                  .split('\n')
                  .map((paragraph, i) => <Text key={i}>{paragraph}</Text>)}
            </NoteContentSection>
          </NoteText>
          {this.renderNavigationController()}
        </NoteWrapper>
      </TotalWrapper>
    )
  }

  render() {
    if (this.currentTrip() == null) return null
    if (this.state.step === -1) {
      return <Redirect to={`/trip/${this.currentTrip().id}/edit`} />
    }

    const step = [...this.currentTrip().media].sort((a, b) => {
      const timeDiff = a.dateTime.valueOf() - b.dateTime.valueOf()
      if (timeDiff > 0) {
        return 1
      } else if (timeDiff < 0) {
        return -1
      }
      return 0
    })[this.state.step]

  
    if (step.type === MediaItemType.Image) {
      return this.renderImageMedium(step)
    } else if (step.type === MediaItemType.Note) {
      return this.renderNoteMedium(step)
    }
  }
}

export default connect((state: any) => ({
  trips: state.trip
}))(TripViewer)
