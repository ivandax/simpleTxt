import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';

import Post from './Post';

const postData_1 = {
        content: "This is a test", 
        likedBy: ["liker1", "liker2"],
        profileId: "profileIdxx1",
        replies: ["reply1", "reply2"],
        timestamp: 1575831383315,
        name: "John Travolta",
        pic: "someURL",
        postId: "postId"
}

describe("post trials", ()=>{

  it("Contains expected data", ()=>{
      const wrapper = shallow(<Post postData={postData_1}/>);
      console.log(wrapper.debug({verbose: true}));
      const post = <>
          <div className='post'>
              <img src='someURL' alt='avatar'/>
              <div className='postContent'>
                  <div className="userData">
                      <span className="username">John Travolta</span>
                      <span className="postDate">12/8/2019</span>
                  </div>
              </div>
              <p className="postText">
                  This is a test
              </p>
              <div className="interactions">
              </div>
          </div>
      </>
      expect(wrapper.contains(<img src='someURL' alt='avatar'/>)).toEqual(true);
  })
});