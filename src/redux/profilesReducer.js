function profilesReducer(state = null, action) {
    switch(action.type) {
      case 'SET_PROFILES': {
        return action.payload;
      }
      default: {
        return state;
      }
    }
  }
  
  export default profilesReducer;