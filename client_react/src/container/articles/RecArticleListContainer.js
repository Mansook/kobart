import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleList from "../../components/articles/ArticleList";
import { readArticleById } from "../../lib/api/article/article";
import {
  loadRecList,
  selectRecArticleList,
} from "../../modules/slices/articleList";
import { selectRecommendation, selectUser } from "../../modules/slices/auth";
import { selectLoading } from "../../modules/slices/loading";

const RecArticleListContainer = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const _id = user._id;
  const dispatch = useDispatch();
  const data = useSelector(selectRecArticleList);
  const list = data.data;
  console.log(list);
  useEffect(() => {
    dispatch(loadRecList({ _id: _id }));
  }, [user]);

  return <ArticleList loading={loading} list={list} />;
};
export default RecArticleListContainer;

//<ArticleList loading={loading} list={list} />
