import React from "react";
import Write from "../../components/write/Write";
import { useDispatch, useSelector } from "react-redux";
import { selectPost } from "../../modules/slices/write";
import { useEffect } from "react";
import { writepost } from "../../modules/slices/write";
import { selectLoading } from "../../modules/slices/loading";
import { useCallback } from "react";
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
  const reporter = post.reporter;

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
        Date: Date.now(),
        image: "",
        article_main: body,
      })
    );
  };

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <Write
      onChangeField={onChangeField}
      onSubmit={onSubmit}
      title={title}
      body={body}
      loading={loading}
    />
  );
};

export default WriteContainer;
