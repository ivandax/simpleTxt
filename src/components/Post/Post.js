import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { deleteItem, getItem, updateItemMerge } from '../../services/database';
import { userLikes, userUnlikes } from '../../utils/likeLogic';

import Form from '../Form';

import "./Post.scss";

const Post = ({postData}) => {
    const profile = useSelector(state=>state.user);
    const [showClass, setShowClass] = useState('');
    const [amLiked, setAmLiked] = useState(false);
    const [displayReplyForm, setDisplayReplyForm] = useState(false);
    const [displayReplies, setDisplayReplies] = useState(false);

    const toggleDelete = () => {
        showClass === '' ? setShowClass("show") : setShowClass("");
    }

    useEffect( () => {
        postData.likedBy.includes(profile.id) && setAmLiked(true);
    }, [postData.likedBy, profile.id]);

    const deleteMe = async () => {
        const result = deleteItem("posts", postData.postId);
        if(result){
            const profile = await getItem('profiles', postData.profileId);
            await updateItemMerge('profiles', {posts : profile.posts-1} , postData.profileId)           
        }
    }

    const toggleLikeMe = async () => {
        if(!amLiked){
            userLikes(postData.postId, postData.profileId, profile.id, setAmLiked)
        } else{
            userUnlikes(postData.postId, postData.profileId, profile.id, setAmLiked)
        }
    }

    const setPost = async (replyData) => {
        const modifiedReplyData = {...replyData, name : profile.name, pic: profile.pic}
        const thisPost = await getItem('posts', postData.postId);
        const thisPostReplies = [...thisPost.replies];
        thisPostReplies.push(modifiedReplyData);
        const result = await updateItemMerge('posts', {replies: thisPostReplies}, postData.postId);
        result && setDisplayReplies(true) && setDisplayReplyForm(false);
    }

    const handleReplyAttempt = () => {
        displayReplyForm ? setDisplayReplyForm(false) : setDisplayReplyForm(true);
    }

    const toggleShowReplies = () => {
        displayReplies ? setDisplayReplies(false) : setDisplayReplies(true);
    }

    return (
        <>
            <div className="post">
                <img src={postData.pic} alt="avatar"/>
                <div className="postContent">
                    <div className="userData">
                        <span className="username">{postData.name}</span>
                        <span className="postDate">
                            {(new Date(postData.timestamp)).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="postText">{postData.content}</p>
                    <div className="interactions">
                        {postData.profileId === profile.id ?
                        <>
                            <span>Replies:</span>
                            <span onClick={toggleShowReplies}>{postData.replies ? postData.replies.length : 0}</span>
                            <span>Likes:</span>
                            <span>{postData.likedBy ? postData.likedBy.length : 0}</span>
                            <button className={`delete ${showClass}`} onClick={deleteMe}>Delete</button>
                            <button className="options" onClick={toggleDelete}>☰</button>
                        </>
                        :
                        <>
                            <button onClick={handleReplyAttempt}>➧</button>
                            <span onClick={toggleShowReplies}>{postData.replies ? postData.replies.length : 0}</span>
                            <button onClick={toggleLikeMe} className={`like ${ amLiked ? 'liked' : ''}`}>★</button>
                            <span>{postData.likedBy ? postData.likedBy.length : 0}</span>
                        </>}
                    </div>            
                </div>
            </div>
            <div className={`replyForm ${displayReplyForm ? 'show' : ''}`}>
                <Form setPost={setPost} buttonText={'Reply'}/>
            </div>
            {postData.replies.length>0 && <div className={`replies ${displayReplies ? 'show' : ''}`}>
                {postData.replies.map( (reply) => {
                return <div key={reply.timestamp+reply.profileId} className="reply">
                        <img src={reply.pic} alt={reply.name}/>
                        <div>
                            <span>{`${reply.name} replied:`}</span>
                            <p>{reply.content}</p>
                        </div>
                    </div>
                })}
            </div>}
        </>
    )
}

export default Post;