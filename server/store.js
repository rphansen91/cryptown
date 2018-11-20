import { createStore } from 'redux';
import createHistory from 'history/createMemoryHistory';
import rootReducer from '../src/store/reducers';

const createServerStore = (path = '/') => {
  const initialState = {
    coins: []
  }
  const store = createStore(rootReducer, initialState)
  return { store }
}

export default createServerStore
