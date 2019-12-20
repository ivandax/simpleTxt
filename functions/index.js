const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.alterDummies = functions.firestore
    .document('profiles/{posts}')
    .onUpdate(async (change, context) => {
        const newData = change.after.data();
        const previousData = change.before.data();
        //console.log("new data", newData, newData.id, newData.posts);
        // console.log("old data", previousData);

        if(newData.posts > previousData.posts && newData.posts > 10){
            //console.log("Increased"); //only if user increases.

            const querySnap = await db.collection('posts')
            .where('profileId', '==', newData.id)
            .orderBy('timestamp').limit(1).get();

            if(querySnap){
                querySnap.docs[0].ref.delete();
            }
        }
    });