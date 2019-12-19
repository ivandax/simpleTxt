const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

// exports.alterDummies = functions.firestore
//     .document('profiles/{posts}')
//     .onUpdate((change, context) => {
//         const newData = change.after.data();
//         const previousData = change.before.data();

//         console.log("new data", newData, newData.id, newData.posts);
//         console.log("old data", previousData);

//         if(newData.posts > previousData.posts){
//             console.log("Increased");
//             const posts = db.collection('posts')
//             .where('profileId', '==', newData.id)
//             .orderBy('timestamp');
//             db.collection('trials').add({content: posts});
//         }
//     });