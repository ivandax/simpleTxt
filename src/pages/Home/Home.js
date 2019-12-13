import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { registerAuthObserver } from '../../services/auth';
import { addItem, getItem, updateItemMerge, getAll } from '../../services/database';

import { setUser, setUserProfiles } from '../../redux/userActions';

import Form from '../../components/Form';
import ProfileViewer from '../../components/ProfileViewer';
import Overlay from '../../components/Overlay';
import Timeline from '../../components/Timeline';

import './Home.scss';

const Home = () => {

  const dispatch = useDispatch();

  /* every time we go to home, we refresh the user and available profiels in redux.*/
  useEffect( ()=> {
    const cancelObserver = registerAuthObserver(async (user)=>{
      if(user){
        const profile = await getItem('profiles', user.uid);
        if(profile){
          const userProfiles = await getAll('profiles');
          dispatch(setUser(profile)); //user
          dispatch(setUserProfiles(userProfiles));//profiles with updated following arrays.
        } else {
          console.log("Pending...")
        }
      } else{
        dispatch(setUser(null))
      }
    })

    return () => {
      cancelObserver();
    }

  }, [dispatch]);

  const setPost = async (postData) => {
    const result = await addItem(
      'posts',
      postData,
    )
    if(result){
      const profile = await getItem('profiles', postData.profileId);
      await updateItemMerge('profiles', {posts : profile.posts+1} , postData.profileId)
    }
  }

  return (
      <div className="home">
        <ProfileViewer/>
        <Overlay/>
        <div className="homeMain">
          <Form setPost={setPost} buttonText={'Post'}/>
          <Timeline />
        </div>
      </div>
  );
}

export default Home;