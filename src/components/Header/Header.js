import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { showProfileViewer } from '../../redux/userActions';
import { getItem } from '../../services/database';
import './Header.scss';

const Header = () => {

  const [profileDetails, setProfileDetails] = useState({pic:''})
  const dispatch = useDispatch();
  const profile = useSelector(state=>state.user);

  useEffect(() => {
    const fetch = async (id) => {
      const data = await getItem('profiles', id);
      setProfileDetails(data)
    }
    fetch(profile.id);
  }, [profile.id])


  const handleAvatarClick = () => {
    dispatch(showProfileViewer());
  }

  return (
      <div className="header">
        <h2 className="brand">{"<simpleTxt />"}</h2>
        <img src={profileDetails.pic} alt="avatar" onClick={handleAvatarClick}/>
        <NavLink className="headerLink" activeClassName="selected" to={'/Home'}>Home</NavLink>
        <NavLink className="headerLink" activeClassName="selected" to={'/Search'}>Search</NavLink>
        <NavLink className="headerLink" activeClassName="selected" to={'/Profile'}>Profile</NavLink>
      </div>
    )
}

export default Header;