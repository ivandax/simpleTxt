import { getItem, updateItemMerge } from '../services/database';

const getUserList = async (userId, selection) => {
    const user = await getItem("profiles", userId);
    if(selection==="following"){
        return user.following;
    } else {
        return user.followers;
    }
}

const userFollows = async (userId, newFollowId, callback) => {
    const userFollows = await getUserList(userId, "following");
    const newUserFollows = [...userFollows, newFollowId];
    const newFollowing = await updateItemMerge("profiles", {following: newUserFollows}, userId);
    const targetUserList = await getUserList(newFollowId, "followers");
    const newTargetFollowerList = [...targetUserList, userId];
    const updatedTargetFollowers = await updateItemMerge("profiles", {followers: newTargetFollowerList}, newFollowId);

    newFollowing && updatedTargetFollowers && callback(true);
}

const userUnfollows = async (userId, idToRemove, callback) => {
    const userFollows = await getUserList(userId, "following");
    const newUserFollows = [...userFollows];
    newUserFollows.splice(newUserFollows.indexOf(idToRemove), 1); //splice mutates the array.
    const removedFollowing = await updateItemMerge("profiles", {following: newUserFollows}, userId);

    const targetUserList = await getUserList(idToRemove, "followers");
    const targetFollowerList = [...targetUserList];
    targetFollowerList.splice(targetUserList.indexOf(userId),1);
    const updatedTargetFollowers = await updateItemMerge("profiles", {followers: targetFollowerList}, idToRemove);

    removedFollowing && updatedTargetFollowers && callback(false);
}

export {
    userFollows,
    userUnfollows,
};