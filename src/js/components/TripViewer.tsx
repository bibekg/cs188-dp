import * as React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { MediaItemType, MediaItem } from '../type-defs/MediaItem'

import Text from './Text'
import Button from './Button'
import mockTrips from '../mocks/mock'

const TripStepType = {
  backgroundImage: PropTypes.string,
  topText: PropTypes.string,
  bottomInfoComponent: PropTypes.instanceOf(React.Component)
}

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`

const ViewerWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 30px;
  background-image: url(${props => props.image});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

// TODO: Back button
// TODO:

class TripViewer extends React.Component {
  static defaultProps = {
    trip: mockTrips['1']
  }

  state = {
    step: 0
  }

  constructor(props) {
    super(props)
    this.goNext = this.goNext.bind(this)
  }

  goBack() {}

  goNext() {
    if (this.isOnLastStep()) {
      this.setState({ step: -1 })
    }

    let nextStepIndex = this.state.step + 1
    while (
      this.props.trip.media[nextStepIndex].type !== MediaItemType.Image &&
      this.props.trip.media[nextStepIndex].type != null
    ) {
      nextStepIndex += 1
    }
    this.setState({
      step: nextStepIndex
    })
  }

  isOnLastStep() {
    return this.state.step === this.props.trip.media.length - 1
  }

  render() {
    if (this.state.step === -1) {
      return <Redirect to="/trip" />
    }

    const step = this.props.trip.media[this.state.step]
    const { id, dateTime, type } = step

    const lastPicture = this.isOnLastStep()
    const showBackButton = true
    if (type === MediaItemType.Image) {
      return (
        <ViewerWrapper image={step.src}>
          <Overlay>
            <Text>{step.description}</Text>
            <Text>
              <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />{' '}
              {step.location.name}
            </Text>
          </Overlay>
          <div>
            {step.link &&
              step.link.type === 'note' && (
                <Overlay>
                  <Text>
                    You wrote a note about it <a>here</a>
                  </Text>
                </Overlay>
              )}
            <NavigationContainer>
              {showBackButton && <Button onClick={this.goBack}>Back</Button>}

              <Button primary onClick={this.goNext}>
                {lastPicture ? 'Finish' : 'Next'}
              </Button>
            </NavigationContainer>
          </div>
        </ViewerWrapper>
      )
    }
  }
}

export default TripViewer
