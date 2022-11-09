const { default: client } = require("../client");

export const readArticles = ({ page, limit = 10 }) =>
  client.get(`article/post?page=${page}&limit=${limit}`);
