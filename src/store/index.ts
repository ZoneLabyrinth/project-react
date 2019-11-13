import { createStore } from 'redux';
import { AppStore } from './reducers';

const store = createStore(AppStore);

export default store;
