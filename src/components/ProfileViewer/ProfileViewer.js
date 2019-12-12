import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

import ProfileDetails from '../ProfileDetails';

import './ProfileViewer.scss'

const ProfileViewer = () => {
    const displayMe = useSelector(state=>state.toggleProfileViewer.className);

    return (
        <div className={`profileViewer ${displayMe}`}>
            <ProfileDetails />
            <Link className="profileLink" to="/Profile">Profile</Link>
        </div>
    )
}

export default ProfileViewer;