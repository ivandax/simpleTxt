import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './ProfileCard.scss';

import { getItem } from '../../services/database';
import { userFollows, userUnfollows} from '../../utils/followLogic';

const ProfileCard = ({profileData}) => {

    //profile is the user who is logged in... 
    //profileData is the incoming data for each different user.
    const profile = useSelector(state=>state.user);

    const [amFollowed, setAmFollowed] = useState(false);

    useEffect( () => { //initial check to see if user is following this card's profile
        const getFollowing = async () => {
            const currentUser = await getItem('profiles', profile.id);
            const userFollows = currentUser.following;
            if(profile && userFollows.includes(profileData.id)){
                setAmFollowed(true)
            }
        }
        getFollowing();
    }, [profile, profileData.id])

    const toggleFollow = async () => {
        
        if(!amFollowed){
            userFollows(profile.id, profileData.id, setAmFollowed);
        } else{
            userUnfollows(profile.id, profileData.id, setAmFollowed);
        }
    }

    return(
        <div className="profileCard">
            <div className="main">
                <img src={profileData.pic} alt="avatar"/>
                <div className="identity">
                    <h3>{profileData.name}</h3>
                    <p>{profileData.email}</p>
                    {profileData.id !== profile.id && <button className={ amFollowed ? 'followed' : 'notFollowed'} onClick={toggleFollow}>{ amFollowed ? 'Unfollow' : 'Follow'}</button>} {/*can't follow myself*/}
                </div>
            </div>
            <hr />
            <div className="bio">
                {profileData.bio}
            </div>
        </div>
    )
}

export default ProfileCard;