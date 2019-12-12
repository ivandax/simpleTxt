function setUser(user) {
    return { type: 'SET_USER', payload: user };
  }

const showProfileViewer = () => {
  return {type: "show"}
}

const hideProfileViewer = () => {
  return {type: "hide"}
}

const setUserProfiles = (profiles) => {
  return {type: 'SET_PROFILES', payload: profiles};
}
  
export {
  setUser,
  showProfileViewer,
  hideProfileViewer,
  setUserProfiles
}