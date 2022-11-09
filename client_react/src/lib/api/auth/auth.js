const { default: client } = require("../client");

export const registerUser = ({ user }) =>
  client.post(`article/api/users/register`);

export const loginUser = ({ user }) => client.post(`article/api/users/login`);
