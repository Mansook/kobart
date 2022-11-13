import React from "react";
import { useLocation } from "react-router-dom";
import "./css/article.css"

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
    <div className="article_main">
      <hr/>
      <div className="article_box">제목:{article_name}</div>
      <div className="article_box">내용:{article_main}</div>
      <div className="article_box">요약:{article_summary}</div>
      <div className="article_box">키워드:{keywords}</div>
      <div className="article_box_reporter">리포터:{reporter}</div>
      <hr/>
    </div>
  );
};

export default Article;
