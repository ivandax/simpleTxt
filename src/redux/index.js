import { combineReducers } from 'redux';

import userReducer from './userReducer';
import profileViewerReducer from './profileViewerReducer';
import profilesReducer from './profilesReducer';

const rootReducers = combineReducers({
  user: userReducer, 
  toggleProfileViewer: profileViewerReducer,
  setUserProfiles: profilesReducer
})

export default rootReducers;