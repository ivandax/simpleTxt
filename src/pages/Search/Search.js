import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 

import { registerAuthObserver } from '../../services/auth';
import { setUserProfiles } from '../../redux/userActions';
import { getAll } from '../../services/database';

import SearchForm from '../../components/SearchForm';
import ProfileCard from '../../components/ProfileCard';
import ProfileViewer from '../../components/ProfileViewer';
import Overlay from '../../components/Overlay';

import './Search.scss';

const Search = () => {
    
    const [searchString, setSearchString] = useState("");
    const userProfiles = useSelector(state=>state.setUserProfiles);
    const dispatch = useDispatch();

    useEffect( () => {
        const cancelObserver = registerAuthObserver( async (user) => {
            if(user){
                //on search page, initially update profiles in redux
                const userProfiles = await getAll('profiles');
                dispatch(setUserProfiles(userProfiles));
            } else{
                console.log("Not logged?")
            }
        })

        return () => {
            cancelObserver();
        }
    }, [dispatch]) 

    const getSearchString = (string) => {
        setSearchString(string);
    }

    return (
        <div className="search">
            <ProfileViewer/>
            <Overlay/>
            <div>
                <SearchForm getSearchString={getSearchString}/>
                {userProfiles &&
                userProfiles.map( (profile) => {
                    if(!searchString){
                        return <ProfileCard key={profile.id} profileData={profile}/> 
                    } else if(searchString && profile.name.toLowerCase().includes(searchString.toLowerCase())){
                        return <ProfileCard key={profile.id} profileData={profile}/>
                    }
                    return null; 
                } )}
            </div>
        </div>
    )
}

export default Search;