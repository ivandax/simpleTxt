import firebase from  'firebase';
import 'firebase/firestore';
import {getProfileLikeCount} from './likeLogic';
import config from '../config';

firebase.initializeApp(config.firebase);

describe('simple get trial', function(){

    test('Likes should be an integer', async function(){
      const likes = await getProfileLikeCount('OVwaMywvHAcIrWGVwRHfeteSTy93');
      console.log("Likes is: ",likes);
      expect(typeof(likes)).toBe('number');
    });

    test('Likes should be an integer', async function(){
        const likes = await getProfileLikeCount('X4vilVgKOOTf4J22Hekjs0Pj5Pu2');
        console.log("Likes is: ",likes);
        expect(typeof(likes)).toBe('number');
      });

      test('Likes should be an integer', async function(){
        const likes = await getProfileLikeCount('s68AXFlyvjT1VBG3RzaOkEUZMDE2');
        console.log("Likes is: ",likes);
        expect(typeof(likes)).toBe('number');
      });
  })