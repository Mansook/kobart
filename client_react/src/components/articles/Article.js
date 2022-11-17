import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./css/article.css";

const Article = () => {
  const { state } = useLocation();
  const [toggle, setToggle] = useState(false);
  const {
    image,
    article_main,
    article_name,
    article_summary,
    keywords,
    reporter,
    _id,
  } = state;
  console.log(image);

  return (
    <div className="article_main">
      <hr />
      <div className="article_box">제목:{article_name}</div>
      <div className="article_main_image">
        <img style={{ width: "300px" }} src={image} />
      </div>
      {/* <div className="article_box">내용:{article_main}</div> */}
      <div
        className="article_box"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        요약:{article_summary}
      </div>
      {toggle ? (
        <div className="article_box">내용:{article_main}</div>
      ) : (
        <div />
      )}
      {/* <div className="article_box">키워드:{keywords}</div> */}
      {keywords !== null ? keywords.map((c) => <div>#{c}</div>) : <div />}
      <div className="article_box_reporter">리포터:{reporter}</div>
      <hr />
    </div>
  );
};

export default Article;
