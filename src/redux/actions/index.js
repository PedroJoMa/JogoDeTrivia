export const LOGIN = 'LOGIN';
export const ADD_USER = 'ADD_USER';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});
