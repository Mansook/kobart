import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { readArticles } from "../../lib/api/article/article";
import Article from "./Article";
const List = ({ data }) => {
  return data ? (
    <div>
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
      onClick={() => navigate(`${_id}`, { state: article })}
      style={{ cursor: "pointer" }}
    >
      {article_name}
    </div>
  );
};

const ArticleList = ({ loading, list }) => {
  const { data } = list;
  return <List data={data} />;
};

export default ArticleList;
