const initialState = { className : ''}

function profileViewerReducer(state = initialState, action) {
    switch(action.type) {
      case 'show': {
        return { className : 'show' };
      }
      case 'hide': {
        return { className : '' };
      }
      default: {
        return state;
      }
    }
  }
  
  export default profileViewerReducer;