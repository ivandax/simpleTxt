import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux';

import { registerAuthObserver } from '../../services/auth';
import { getItemRealTime } from '../../services/database';

import './ProfileDetails.scss';

const ProfileDetails = () => {

    const profile = useSelector(state=>state.user);
    const [profileDetails, setProfileDetails] = useState({following:0,followers:0});

    useEffect( () => {
        const cancelObserver = registerAuthObserver( async (user) => {
            if(user){
                await getItemRealTime( //allows get item, display results on real time (on snapshot... database.js)
                {
                    collection: 'profiles',
                    id: profile.id,
                    callback: (itemDb) => {
                        let result;
                        if(profile){
                            result = itemDb.data();
                        }
                        setProfileDetails(result);
                    }
                }
            )}                
        })

        return () => {
            cancelObserver();
        }
    }, [profile])    

    return(
        <div className="profileDetails">
            <img src={profileDetails.pic} alt="avatar" />
            <h3>{profileDetails.name}</h3>
            <p>{profileDetails.email}</p>
            <div className="counts">
                <span className="countsLabel">Following:</span>
                <span>{(profileDetails.following.length-1).toString()}</span>
                <span className="countsLabel">Followers:</span>
                <span>{profileDetails.followers.length}</span>
                <hr />
                <div className="countsDetails">
                    <span className="countsLabel">Likes: </span>
                    <span>{profileDetails.likes}</span>
                </div>
                <div className="countsDetails">
                    <span className="countsLabel">Posts: </span>
                    <span>{profileDetails.posts}</span>
                </div>
            </div>  
        </div>
    )

}

export default ProfileDetails;