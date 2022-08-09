import { ADD_USER, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      name: action.payload.username,
      gravatarEmail: action.payload.email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
}

export default playerReducer;
