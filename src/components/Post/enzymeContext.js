import { createMount, createShallow } from 'enzyme-context';
import { reduxContext } from 'enzyme-context-redux';
import { createStore } from 'redux';
import rootReducers from '../../redux/';

const plugins = {
  store: reduxContext({ createStore: () => createStore(rootReducers) }),
};

export const mount = createMount(plugins);
export const shallow = createShallow(plugins);