import React from 'react';
import { shallow } from 'enzyme';

import Trial from './Trial';

const data1 = {
    title: "Skylab",
    content: "Frontend Course"
}

describe('TRIAL', () => {
    it('Skylab - Frontend Course', () => {
      const wrapper = shallow(<Trial data={data1} />);
      //console.log(wrapper.debug())
      const trial = <div><div>Skylab</div><p>Frontend Course</p></div>
      expect(wrapper.contains(trial)).toEqual(true);
    });
})