import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readArticles } from "../../lib/api/article/article";
import Article from "./Article";
import "./css/articlelist.css"

const List = ({ data }) => {
  return data ? (
    <div className="list_style">
      {data.map((c) => (
        <HeadLine key={c._id} article={c} />
      ))}
    </div>
  ) : (
    <div>로딩중</div>
  );
};

const HeadLine = ({ article }) => {
  const navigate = useNavigate();
  const { _id, article_name, reporter, keywords } = article;
  return (
    <div className="list_style_box"
      onClick={() => navigate(`${_id}`, { state: article })}
      style={{ cursor: "pointer"}}
    >
      <div style ={{"margin-top": "5px"}}>{article_name}</div>
      <div className="separate_box">
        <div>기자: {reporter}</div>
        <div>날짜: {article.Date.split("T",1)} </div>
      </div>
    </div>
  );
};
const butNum = (n) => {
  return (
    <div
      style={{
        cursor: "pointer",
        color: "blue",
      }}
    >
      {n}
    </div>
  );
};

const ArticleList = ({ loading, list }) => {
  const { data, limit, maxPage, success } = list;
  const createPagenation = (n) => {
    for (var i = 1; i <= n; i++) {
      butNum(i);
    }
  };
  if (loading) return <div>로딩중</div>;
  else
    return (
      <div>
        <List data={data} />
      </div>
    );
};

export default ArticleList;
