const initialState = {}

const quiz = (state = initialState, action) => {
  switch(action.type) {
    case 'TOGGLE_CHECKBOX':
      let nextState = {}
      nextState = {...state}
      nextState[action.id] = !state[action.id]
      //console.log("nextState", nextState)
      return nextState
      break;
    case 'RESET_CHECKBOXES':
      return {}
      break;
    default:
      return state
  }
}

export default quiz;
