import React from 'react';
//import { Provider } from 'react-redux';
//import { createStore } from 'redux';
//import setUser from '../../redux/userActions';
//import { shallow } from 'enzyme';

import { shallow, mount } from './enzymeContext';

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

describe("Post trials", () => {
    let wrapper;

    // beforeEach(() => {
    //     wrapper = shallow(<Post />);
    //     wrapper.store.dispatch({ type: 'SET_USER', payload: {id: 'OVwaMywvHAcIrWGVwRHfeteSTy93'} });
    //     wrapper.update();
    //     console.log(wrapper.debug({verbose:true}));
    // })
  
    it("Contains expected data", () => {
        wrapper = mount(<Post />, {initialActions:[{type:'SET_USER',payload: {id: 'aaa'}}]});
        console.log(wrapper.debug({verbose:true}));
        const post = <>
            <div className='post'>
                <img src='someURL' alt='avatar' />
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
        expect(wrapper.contains(<img src='someURL' alt='avatar' />)).toEqual(true);
    })
});