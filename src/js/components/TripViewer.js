import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const TripStepType = {
  backgroundImage: PropTypes.string,
  topText: PropTypes.string,
  bottomInfoComponent: PropTypes.instanceOf(React.Component)
}

const ViewerWrapper = styled.div`
  background-image: url(${props => props.backgroundImage});
`

class TripViewer extends React.Component {
  state = {
    step: 0
  }

  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.goNext = this.goNext.bind(this)
  }

  static propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape(TripStepType))
  }

  static defaultProps = {}

  goBack() {
    this.setState({
      step: this.state.step - 1
    })
  }

  goNext() {
    this.setState({
      step: this.state.step + 1
    })
  }

  render() {
    const { backgroundImage, topText, bottomInfoComponent } = this.props.steps[
      this.state.step
    ]
    const showNextButton = this.state.step < this.props.steps.length - 1
    return (
      <ViewerWrapper image={backgroundImage}>
        <h1>{topText}</h1>
        {bottomInfoComponent}
        {showNextButton && <button onClick={this.goNext}>Next</button>}
      </ViewerWrapper>
    )
  }
}

export default TripViewer
