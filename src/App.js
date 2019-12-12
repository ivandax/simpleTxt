import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Switch, Route 
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, setUserProfiles } from './redux/userActions';
import { registerAuthObserver } from './services/auth';
import { getItem, getAll } from './services/database';

import Welcome from './pages/Welcome';
import CreateAccount from './pages/CreateAccount';
import Header from './components/Header';  
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import './App.css';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const profile = useSelector(state=>state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const cancelObserver = registerAuthObserver(async(user)=>{
      //console.log("on App.js", user);
      if(user){
        const profile = await getItem('profiles', user.uid);
        //console.log("on App.js profile is:", profile);
        if(profile){
          const userProfiles = await getAll('profiles');
          dispatch(setUser(profile));
          dispatch(setUserProfiles(userProfiles));
        } else{
          console.log("...registering");
        }
      } else{
        dispatch(setUser(null));
      }
      setIsLoading(false);
    })

    return () => {
      cancelObserver();
    }
  }, [dispatch]);

  if(isLoading) return <div>Loading...</div>

  const defaultRoute = profile
  ? <Route path="/" component={Home}></ Route> 
  : <Route path="/" component={Welcome}></ Route>;

  return (
    <div className="App">
      <Router>

        {profile && <Header/>}

        <Switch>
          <Route path="/Welcome" component={Welcome}></ Route>
          <Route path="/CreateAccount" component={CreateAccount}></ Route>
          {profile && <Route path="/Search"><Search/></ Route>}
          {profile && <Route path="/Profile" component={Profile}></ Route>}
          {profile && <Route path="/Settings" component={Settings}></ Route>}
          {profile && <Route path="/Home"><Home/></ Route>}

          {defaultRoute};

        </ Switch>

      </ Router>
    </div>
  );
}

export default App;
