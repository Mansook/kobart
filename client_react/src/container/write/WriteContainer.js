import React from "react";
import Write from "../../components/write/Write";
import { useDispatch, useSelector } from "react-redux";
import { selectPost } from "../../modules/slices/write";
import { useEffect } from "react";
import { writepost } from "../../modules/slices/write";
import { selectLoading } from "../../modules/slices/loading";
import { useCallback } from "react";
import { selectUser } from "../../modules/slices/auth";
import {
  changefield,
  initialize,
  selectWrite,
} from "../../modules/slices/write";

const WriteContainer = () => {
  const dispatch = useDispatch();
  const post = useSelector(selectWrite);

  const title = post.title;
  const body = post.body;
  const date = post.date;
  const image = post.image;
  const reporter = post.reporter;

  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const onChangeField = useCallback(
    (payload) => dispatch(changefield(payload)),
    [dispatch]
  );

  const onSubmit = () => {
    dispatch(
      writepost({
        article_name: title,
        reporter: reporter,
        Date: date,
        image: image,
        article_main: body,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  if (user === null) return <div>로그인이 필요합니다</div>;
  else
    return (
      <Write
        onChangeField={onChangeField}
        onSubmit={onSubmit}
        title={title}
        body={body}
        date={date}
        image={image}
        loading={loading}
      />
    );
};

export default WriteContainer;
