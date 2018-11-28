const DEFAULT_TRIP_STATE = null

const tripReducer = (state = DEFAULT_TRIP_STATE, action) => {
  switch (action.type) {
    case GET_TRIP:
    case UPDATE_TRIP:
    case ADD_MEDIA:
    default:
      return state
  }
}

export default tripReducer
