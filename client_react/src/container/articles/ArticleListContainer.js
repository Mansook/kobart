import React, { useEffect } from "react";
import ArticleList from "../../components/articles/ArticleList";
import { useSelector, useDispatch } from "react-redux";
import { loadList, selectArticleList } from "../../modules/slices/articleList";
import { selectLoading } from "../../modules/slices/loading";
const ArticleListContainer = () => {
  const loading = useSelector(selectLoading);
  const list = useSelector(selectArticleList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadList());
  }, []);
  return <ArticleList loading={loading} list={list} />;
};

export default ArticleListContainer;
