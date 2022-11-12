import React, { useEffect, useState } from "react";
import ArticleList from "../../components/articles/ArticleList";
import { useSelector, useDispatch } from "react-redux";
import { loadList, selectArticleList } from "../../modules/slices/articleList";
import { selectLoading } from "../../modules/slices/loading";
import qs from "qs";
import { useParams, useSearchParams } from "react-router-dom";
import { selectUserData } from "../../modules/slices/auth";
import { SelectFomContainer } from "../selection/SelectFormContainer";
const ArticleListContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const loading = useSelector(selectLoading);
  const list = useSelector(selectArticleList);
  const Data = useSelector(selectUserData);
  const { _id, email, company } = Data.Data;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      loadList({
        page: parseInt(page),
        limit: parseInt(limit),
      })
    );
  }, []);

  if (company.length == 0) {
    return <SelectFomContainer _id={_id} />;
  }
  return <ArticleList loading={loading} list={list} />;
};

export default ArticleListContainer;
//<ArticleList loading={loading} list={list} />;
