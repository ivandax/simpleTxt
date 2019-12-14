import React from 'react';
import { shallow } from 'enzyme';

import Post from './Post';

const postData_1 = {
        content: "This is a test", 
        likedBy: ["liker1", "liker2"],
        profileId: "profileIdxx1",
        replies: ["reply1", "reply2"],
        timestamp: 22222222222,
        name: "John Travolta",
        pic: "someURL",
        postId: "postId"
    }