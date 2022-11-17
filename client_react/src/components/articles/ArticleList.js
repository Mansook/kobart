import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readArticles } from "../../lib/api/article/article";
import Article from "./Article";
import "./css/articlelist.css";

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
    <div
      className="list_style_box"
      onClick={() => navigate(`${_id}`, { state: article })}
      style={{ cursor: "pointer" }}
    >
      <div>{article_name}</div>
      <div className="separate_box">
        <div>기자: {reporter}</div>
        <div>
          날짜: {article.Date !== null ? article.Date.split("T", 1) : ""}{" "}
        </div>
      </div>
    </div>
  );
};

const ArticleList = ({ loading, list }) => {
  if (loading) return <div>로딩중</div>;
  else
    return (
      <div>
        <List data={list} />
      </div>
    );
};

export default ArticleList;
