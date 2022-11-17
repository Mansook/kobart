const { default: client } = require("../client");

export const writePost = ({
  article_name,
  reporter,
  Date,
  image,
  article_main,
}) =>
  client.post("/article/write", {
    article_main,
    reporter,
    Date,
    image,
    article_name,
  });

export const updatePost = ({
  article_name,
  reporter,
  Date,
  image,
  article_main,
}) => {
  console.log("patch post");
};
