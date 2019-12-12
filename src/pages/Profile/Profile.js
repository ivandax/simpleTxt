import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getItem } from '../../services/database';
import { logout } from '../../services/auth';

import ProfileDetails from '../../components/ProfileDetails';

import './Profile.scss';

const Profile = ({history}) => {

    const profile = useSelector(state=>state.user);
    const [profileDetails, setProfileDetails] = useState({});
    
    const handleLogOut = () => {
        console.log("Logged Out!");
        logout();
        history.push('/')
    }

    useEffect( () => {
        const fetch = async (id) => {
            const data = await getItem('profiles', id);
            setProfileDetails(
                {
                    bio: data.bio,
                }
            )
        }
        fetch(profile.id);
    }, [profile.id])

    return(
        <div className="profile">
            <div className="detailsContainer">
                <ProfileDetails />
                <div className="bio">
                    <h3>Bio</h3>
                    <p>{profileDetails.bio}</p>
                </div>
                <div className="setting_area">
                    <Link className="buttonStyle" to="/Settings">Edit Profile</Link>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;