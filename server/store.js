import { createStore } from 'redux';
import createHistory from 'history/createMemoryHistory';
import rootReducer from '../src/store/reducers';

const createServerStore = (path = '/') => {
  const initialState = {}
  const store = createStore(rootReducer, initialState)
  return { store }
}

export default createServerStore
