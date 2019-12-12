import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import ReactCrop from 'react-image-crop';

import FormInput from '../../components/FormInput';
import FormTextArea from '../../components/FormTextArea';

import { getItem, updateItemMerge } from '../../services/database';
import {uploadFile}  from '../../services/storage';

import './Settings.scss';
import 'react-image-crop/lib/ReactCrop.scss'

const Settings = ({history}) => {

    const [formData, setFormData] = useState({ pic: '', name: '', bio:  ''});
    const [profileDetails, setProfileDetails] = useState({name: '', bio: ''});
    const [error, setError] = useState('');
    const profile = useSelector(state=>state.user);
    const [fileUploadPercent, setFileUploadPercent] = useState(0);


    useEffect( () => {
        const fetch = async (id) => {
            const data = await getItem('profiles', id);
            setProfileDetails(data)
        }
        fetch(profile.id);
    }, [profile.id]);

    useEffect(()=>{ 
        if(profileDetails){
            setFormData({name: profileDetails.name, bio: profileDetails.bio, pic: profileDetails.pic});
        } else{
            console.log("not executing")
        }
    },[profileDetails])

    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        const downloadURL = await uploadFile(file, setFileUploadPercent);

        const result = await updateItemMerge(
            'profiles',
            {pic: downloadURL},
            profile.id
        );
        if (result){
            setFileUploadPercent(100);
        }
    };

    const handleSave = (event) => {
        event.preventDefault();
        setError('');

        if(!formData.name){
            setError("Your name can't be blank.");
        } else{
            const result = updateItemMerge(
                'profiles',
                {name: formData.name, bio: formData.bio},
                profile.id                
            )
            if(result){
                history.push('/Profile');
            }
        } 
    }

    return (
        <div className="settings">
            <form onSubmit={handleSave}>
                <label>Current Pic:</label>
                <img src={formData.pic} alt="avatar"/>
                <label>Profile Pic</label>
                <input type="file" onChange={handleUploadImage}/>
                <div className="progressBarBase">
                    <div className="progressBar"  style={ {width: fileUploadPercent+'px'}}></div>
                </div>
                <span className="displayPercent">{fileUploadPercent}</span>
                <label>Display Name</label>
                <FormInput 
                    type="text" 
                    placeholder="New display name..." 
                    value={formData.name} 
                    onChange={value => setFormData({ ...formData, name: value })}
                />
                <label>Bio:</label>
                <FormTextArea  
                    placeholder="Add your bio..." 
                    value={formData.bio} 
                    onChange={value => setFormData({ ...formData, bio: value })}
                />
                {error && <div className="error">{error}</div>}
                <button type="submit">Save Changes</button>
                <Link to="/Profile">Back to Profile</Link>
            </form>
        </div>
    )
}

export default Settings;