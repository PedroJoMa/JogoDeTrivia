export const LOGIN = 'LOGIN';
export const ADD_USER = 'ADD_USER';
export const ADD_SCORE = 'ADD_SCORE';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});
