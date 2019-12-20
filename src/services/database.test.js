
import firebase from 'firebase';
import {
 getItem, deleteItem, addItemWithId 
} from './database';
import 'firebase/firestore';
import config from '../config';

firebase.initializeApp(config.firebase);

describe('API - CRUD', () => {
    it('add item test', async () => {
      const collection = 'testing';
      const item = {
            
            text: 'comment',
            timestamp: 1576170789305,
            user: 'JackSparrow'
      };
      const itemId = "x123"
      const result = await addItemWithId(collection, item, itemId);
      expect(!!result).toBe(true);
    });

    it('API - get item', async () => {
        const collection = 'testing';
        const itemId = 'x123';
        const result = await getItem(collection, itemId);
        expect(!!result).toBe(true);
      });

    it('API - delete item', async () => {
        const collection = 'testing';
        const itemId = 'x123';
        const result = await deleteItem(collection, itemId);
        expect(!!result).toBe(true);
      });
});