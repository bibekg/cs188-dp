import * as React from 'react'
import styled from 'styled-components'
import MapOverview from './MapOverview'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'

import Text from './Text'
import OptionSelector from './OptionSelector'
import TextInput from './TextInput'
import { colors } from '../styles'
import { rgba } from 'polished'

const LocationSelectorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const LocationViewWrapper = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  width: 100%;
  position: relative;
`

const PlacesDropdown = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;

  .dropdown-container {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    width: 100%;
    text-align: left;
    border: 2px solid ${rgba(colors.green, 0.1)};
    .suggestion-item {
      background-color: ${colors.offWhite};
      padding: 5px;

      &:not(:last-child) {
        border-bottom: 1px solid ${colors.lightGrey};
      }

      &--active {
        background-color: ${colors.green};
        color: ${colors.white};
      }
    }
  }
`

const MapWrapper = styled.div`
  position: relative;
  z-index: 0;
  height: ${props => props.height || 300}px;
  width: 100%;
`

const PHOTO_SELECTION_MODE = { id: 'photo', text: 'Pull From Photo' }
const CUSTOM_SELECTION_MODE = { id: 'custom', text: 'Custom' }

interface Coordinate {
  lat: number
  lng: number
}

interface PropsType {
  photoCoordinates?: Coordinate | undefined
  onNewCoordinates: (coords: Coordinate) => any
}

enum SelectMode {
  Photo = 'photo',
  Custom = 'custom'
}

interface StateType {
  selectModeId: SelectMode
  searchQuery: string
  coordinates: Coordinate
  mapWidth: number | null
}

export default class LocationSelector extends React.Component<
  PropsType,
  StateType
> {
  mapWrapper: HTMLElement | null = null

  constructor(props: PropsType) {
    super(props)
    this.state = {
      selectModeId: props.photoCoordinates
        ? SelectMode.Photo
        : SelectMode.Custom,
      searchQuery: '',
      coordinates: { lat: 0, lng: 0 },
      mapWidth: null
    }

    this.handlePlaceSelection = this.handlePlaceSelection.bind(this)
    this.handleModeChange = this.handleModeChange.bind(this)
    this.updateMapWidth = this.updateMapWidth.bind(this)
  }

  componentDidMount() {
    this.updateMapWidth()
    window.addEventListener('resize', this.updateMapWidth)
  }

  componentWillReceiveProps(nextProps: PropsType) {
    // debugger
    if (nextProps.photoCoordinates && !this.props.photoCoordinates) {
      // If the selector just got passed photo coordiantes, switch to those
      // coordinates instead of using custom coordinates
      this.setState({ selectModeId: SelectMode.Photo })
    } else if (this.props.photoCoordinates && !nextProps.photoCoordinates) {
      // If the selector just lost its photo coordinate props, switch back to
      // custom coordinate selection
      this.setState({ selectModeId: SelectMode.Custom })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMapWidth)
  }

  decideMapCenter() {
    const { photoCoordinates } = this.props
    const { selectModeId, coordinates } = this.state
    switch (selectModeId) {
      case SelectMode.Photo:
        return photoCoordinates
      case SelectMode.Custom:
        return coordinates
      default:
        return null
    }
  }

  updateMapWidth() {
    // Need to manage map dimensions in state so that it can reliably be a
    // responsive square
    if (this.mapWrapper) {
      this.setState({ mapWidth: this.mapWrapper.clientWidth })
    }
  }

  handleSearchChange = (searchQuery: string) => {
    this.setState({ searchQuery })
  }

  handlePlaceSelection(searchQuery: string) {
    this.setState({ searchQuery })

    // Use Google Places API to try to get the coordinates from the search query
    geocodeByAddress(searchQuery)
      .then(results => getLatLng(results[0]))
      .then(coordinates => {
        if (coordinates && coordinates.lat && coordinates.lng) {
          this.setState({ coordinates })
          this.props.onNewCoordinates(coordinates)
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Error', error)
      })
  }

  handleModeChange(newModeId: string) {
    if (Object.values(SelectMode).includes(newModeId)) {
      // @ts-ignore
      this.setState({ selectModeId: newModeId })
    }
  }

  render() {
    const { photoCoordinates } = this.props
    const { selectModeId } = this.state

    const selectorOptions = [CUSTOM_SELECTION_MODE]
    if (photoCoordinates) {
      selectorOptions.push(PHOTO_SELECTION_MODE)
    }

    const mapCenter = this.decideMapCenter()

    return (
      <LocationSelectorWrapper>
        {selectorOptions.length > 1 && (
          <OptionSelector
            options={selectorOptions}
            selectedOptionId={selectModeId}
            onChange={this.handleModeChange}
          />
        )}

        <LocationViewWrapper>
          {/* Only show places dropdown if user is selected a custom location */
          selectModeId === 'custom' && (
            <PlacesAutocomplete
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
              onSelect={this.handlePlaceSelection}
              // @ts-ignore
              googleCallbackName="CALLBACK_NAME"
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading
              }: any) => (
                <PlacesDropdown>
                  <TextInput
                    {...getInputProps({
                      placeholder: '🔍 Search Places...'
                    })}
                  />
                  {suggestions &&
                    suggestions.length > 0 && (
                      <div className="dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion: any) => (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className: suggestion.active
                                ? 'suggestion-item suggestion-item--active'
                                : 'suggestion-item'
                            })}
                          >
                            <Text
                              color={
                                suggestion.active
                                  ? colors.white
                                  : colors.mostlyBlack
                              }
                            >
                              {suggestion.description}
                            </Text>
                          </div>
                        ))}
                      </div>
                    )}
                </PlacesDropdown>
              )}
            </PlacesAutocomplete>
          )}
          <MapWrapper
            className="map-wrapper"
            innerRef={div => {
              this.mapWrapper = div
            }}
            height={this.state.mapWidth}
          >
            {mapCenter && (
              <MapOverview
                markers={[
                  {
                    key: 0,
                    position: { lat: mapCenter.lat, lng: mapCenter.lng }
                  }
                ]}
              />
            )}
          </MapWrapper>
        </LocationViewWrapper>
      </LocationSelectorWrapper>
    )
  }
}
