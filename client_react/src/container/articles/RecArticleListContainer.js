import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "../../components/articles/ArticleList";
import { readArticleById } from "../../lib/api/article/article";
import {
  loadRecList,
  selectRecArticleList,
} from "../../modules/slices/articleList";
import { selectUser } from "../../modules/slices/auth";
import { selectLoading } from "../../modules/slices/loading";

const RecArticleListContainer = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const _id = user._id;
  const dispatch = useDispatch();
  const list = useSelector(selectRecArticleList);
  useEffect(() => {
    dispatch(loadRecList({ _id: _id }));
  }, []);

  if (loading) return <div>로딩중</div>;
  else return <ArticleList loading={loading} list={list} />;
};
export default RecArticleListContainer;
