import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 

import Post from '../Post';

import { getAllRealTime } from '../../services/database';

import './Timeline.scss';

const Timeline = () => {

    const filterByUser = (array, value) => {
        const result = array.filter( obj => obj.id === value);
        return result[0];
    }

    const [posts, setPosts] = useState([]);
    const userProfiles = useSelector(state=>state.setUserProfiles);
    const profile =  useSelector(state=>state.user);

    useEffect( () => {
        getAllRealTime({
            collection: 'posts',
            //filters: {field: 'profileId', condition: 'in', value: profile.following},
            filters: {field: 'timestamp', condition: '>', value: 0},
            order: 'timestamp',
            callback: (collectionData) => {
                const results = [];
                collectionData.forEach( (document)=>{
                    const postId = document.id;
                    const data = document.data();
                    //console.log(data)
                    if(userProfiles){
                        //console.log(userProfiles)
                        const selectedUser = filterByUser(userProfiles, data.profileId);
                        if(selectedUser){
                            if(profile.following.includes(selectedUser.id)){
                                const { name, pic } = selectedUser;
                                results.push({...data, name, pic, postId});
                            }   
                        }                  
                    }
                });
                setPosts(results)
            }
        });
    }, [profile.following, userProfiles])
    
    return(
        <div className="timeline">
            {posts && 
            posts.map( (post) => {
                return <Post key={post.timestamp+post.profileId} postData={post}/>
            })}
        </div>
    )
}

export default Timeline;