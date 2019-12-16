import React from 'react';
import {shallow} from 'enzyme';

import FormInput from './FormInput';

describe("Form Input trials", ()=>{
    it("Form Input renders OK", ()=>{
        const logdata = (value) => {
            console.log(value)
        }
        const wrapper = shallow(<FormInput value={100} type={"text"} placeholder={"trial placeholder"} maxLength={"30"} onChange={value => logdata(value)}/>);
        console.log(wrapper.debug({verbose: true}))
        const fixed = <input 
            placeholder="trial placeholder"
            type="text"
            value='100'
            maxLength="30"
            onChange={value => logdata(value)}
        />
        expect(wrapper.contains(fixed)).toEqual(true);
    })
 
})



