import { combineReducers } from 'redux';
import playerReducer from './reducer';

const rootReducer = combineReducers({
  playerReducer,
});

export default rootReducer;
