import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { MediaItemType } from '../type-defs/MediaItem'

import Text from './Text'
import Button from './Button'
import { Trip } from '../type-defs/Trip'

const Title = styled(Text)`
  margin-bottom: 30px;
`

const TotalWrapper = styled.div`
  position: relative;
  z-index: 0;
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
  height: 100vh;
  width: 100vw;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`
const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  width: 100%;
`

const ViewerWrapper = styled.div`
  position: relative;
  z-index: 2;

  width: 100vw;
  height: 100vh;
  padding: 30px;
  ${props => (props.image ? `background-image: url(${props.image})` : '')};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const DescriptionSection = styled.div`
  & > * {
    margin-bottom: 20px;
  }
`

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  ${Text} {
    color: white;
  }
  padding: 10px;
  margin: 10px;
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.5);

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
  }

  goBack() {
    if (this.isOnFirstStep()) {
      this.setState({ step: -1 })
      return
    }
    let prevStepIndex = this.state.step - 1

    const currentMedia = this.currentTrip().media

    this.setState({
      step: prevStepIndex
    })
  }

  currentTrip() {
    const { tripId } = this.props.match.params
    const trip = this.props.trips.find(trip => trip.id === tripId)
    return trip!
  }

  goNext() {
    if (this.isOnLastStep()) {
      this.setState({ step: -1 })
      return
    }
    let nextStepIndex = this.state.step + 1

    const currentMedia = this.currentTrip().media

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
    const { id, dateTime, type } = step
    const lastPicture = this.isOnLastStep()
    const showBackButton = true
    if (type === MediaItemType.Image) {
      return (
        <TotalWrapper>
          <BlurBackground image={step.src} />
          <ViewerWrapper image={step.src}>
            <Overlay>
              <Text>{step.caption}</Text>
              <Text>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />{' '}
                {step.location.name}
              </Text>
            </Overlay>
            <div>
              <NavigationContainer>
                {showBackButton && <Button onClick={this.goBack}>Back</Button>}

                <Button primary onClick={this.goNext}>
                  {lastPicture ? 'Finish' : 'Next'}
                </Button>
              </NavigationContainer>
            </div>
          </ViewerWrapper>
        </TotalWrapper>
      )
    } else if (type === MediaItemType.Note) {
      return (
        <NoteWrapper>
          <div>
            <Title large bold>
              {step.title}
            </Title>
            <DescriptionSection>
              {step.content &&
                step.content
                  .split('\n')
                  .map(paragraph => <Text key={paragraph}>{paragraph}</Text>)}
            </DescriptionSection>
          </div>
          <NavigationContainer>
            {showBackButton && <Button onClick={this.goBack}>Back</Button>}
            <Button primary onClick={this.goNext}>
              {lastPicture ? 'Finish' : 'Next'}
            </Button>
          </NavigationContainer>
        </NoteWrapper>
      )
    }
  }
}

export default connect((state: any) => ({
  trips: state.trip
}))(TripViewer)
