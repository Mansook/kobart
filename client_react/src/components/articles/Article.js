import React from "react";
import { useLocation } from "react-router-dom";

const Article = () => {
  const { state } = useLocation();
  const {
    Date,
    article_main,
    article_name,
    article_summary,
    keywords,
    reporter,
    _id,
  } = state;

  return (
    <div>
      <div>제목:{article_name}</div>
      <div>내용:{article_main}</div>
      <div>요약:{article_summary}</div>
      <div>키워드:{keywords}</div>
      <div>리포터:{reporter}</div>
    </div>
  );
};

export default Article;
