import { ADD_USER } from '../actions';

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
  default:
    return state;
  }
}

export default playerReducer;
