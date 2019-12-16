import { getItem, updateItemMerge } from '../services/database';

const getPostLikeList = async (postId) => {
    const thisPost = await getItem("posts", postId);
    return thisPost.likedBy;
}

const getProfileLikeCount = async (userId) => {
    const profile = await getItem('profiles', userId);
    return profile.likes;
}

const userLikes = async (postId, posterId, loggedUserId, callback) => {
      //add the user id to the post's like array
    const thisPostLikes = await getPostLikeList(postId);
    const updatedLikes = [...thisPostLikes, loggedUserId];
    const updatePost = await updateItemMerge('posts', {likedBy : updatedLikes}, postId);
      //add 1 to the profile's like count
    const profileLikes = await getProfileLikeCount(posterId);
    const updateLikeCount = await updateItemMerge('profiles', {likes : profileLikes + 1}, posterId);
      //set class to display liked
    updatePost && updateLikeCount && callback(true);
}

const userUnlikes = async (postId, posterId, loggedUserId, callback) => {
    const thisPostLikes = await getPostLikeList(postId);
    const updatedLikes = [...thisPostLikes];
    updatedLikes.splice(updatedLikes.indexOf(loggedUserId), 1);
    const updatePost = await updateItemMerge('posts', {likedBy: updatedLikes}, postId);
    
    const profileLikes = await getProfileLikeCount(posterId);
    const updateLikeCount = await updateItemMerge('profiles', {likes: profileLikes - 1},posterId);

    updatePost && updateLikeCount && callback(false);
}

export {
    userLikes,
    userUnlikes,
    getProfileLikeCount
}