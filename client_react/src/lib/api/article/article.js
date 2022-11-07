const { default: client } = require("./client");

export const readArticles = () => client.post("article/post");
