import { AppStore } from './reducers'
import { createStore } from 'redux';

const store = createStore(AppStore)

export default store