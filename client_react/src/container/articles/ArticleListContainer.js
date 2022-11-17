import React, { useEffect, useState } from "react";
import ArticleList from "../../components/articles/ArticleList";
import { useSelector, useDispatch } from "react-redux";
import {
  loadList,
  selectArticleList,
  selectPageLimit,
} from "../../modules/slices/articleList";
import { selectLoading } from "../../modules/slices/loading";
import qs from "qs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import "./css/ArticleListContainer.css";

const ArticleListContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const loading = useSelector(selectLoading);
  const list = useSelector(selectArticleList);
  const pageLimit = useSelector(selectPageLimit) || 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loadList({
        page: parseInt(page),
        limit: parseInt(limit),
      })
    );
  }, [dispatch, page, limit]);

  const RightPage = (page, limit) => {
    if (parseInt(page) === pageLimit) return;
    navigate(`/post?&page=${parseInt(page) + 1}&limit=${limit}`);
  };
  const LeftPage = (page, limit) => {
    if (parseInt(page) === 1) return;
    navigate(`/post?&page=${parseInt(page) - 1}&limit=${limit}`);
  };
  return (
    <div>
      <ArticleList loading={loading} list={list} />
      <div className="page_button">
        <div onClick={() => LeftPage(page, limit)}>이전</div>
        <div onClick={() => RightPage(page, limit)}>다음</div>
      </div>
    </div>
  );
};

export default ArticleListContainer;
//<ArticleList loading={loading} list={list} />;
