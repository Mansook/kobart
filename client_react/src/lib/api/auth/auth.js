const { default: client } = require("../client");

export const registerUser = ({ email, password }) =>
  client.post(`article/api/users/register`, {
    email: email,
    password: password,
  });

export const loginUser = ({ email, password }) =>
  client.post(`article/api/users/login`, {
    email: email,
    password: password,
  });
