import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import setUser from '../../redux/userActions';
import { shallow } from 'enzyme';
import rootReducers from '../../redux/';

//import { shallow, mount } from './enzymeContext';

import Post from './Post';

const store = createStore(
    rootReducers
)

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

    store.dispatch({type: 'SET_USER', payload: {id:"aaa"}})

    function WithProvider() {
        return (
            <div>
                <Provider store={store}>
                    <Post postData={postData_1}/>
                </Provider>
            </div>
        );
      }
  
    it("Contains expected data", () => {
        wrapper = shallow(<WithProvider />);
        console.log(wrapper.debug({verbose:true}));
        // const post = <>
        //     <div className='post'>
        //         <img src='someURL' alt='avatar' />
        //         <div className='postContent'>
        //             <div className="userData">
        //                 <span className="username">John Travolta</span>
        //                 <span className="postDate">12/8/2019</span>
        //             </div>
        //         </div>
        //         <p className="postText">
        //             This is a test
        //       </p>
        //         <div className="interactions">
        //         </div>
        //     </div>
        // </>
        expect(wrapper.find('.post'));
    })
}); 