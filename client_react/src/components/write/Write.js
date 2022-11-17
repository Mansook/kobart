import React, { useEffect, useRef } from "react";
import Quill from "quill";

const Write = ({ loading, title, body, reporter, onSubmit, onChangeField }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  const onChangeTitle = (e) => {
    onChangeField({ key: "title", value: e.target.value });
  };
  const onChangeBody = (e) => {
    onChangeField({ key: "body", value: e.target.value });
  };
  const onChangeReporter = (e) => {
    onChangeField({ key: "reporter", value: e.target.value });
  };

  return (
    <div>
      {loading ? <div>딥러닝돌아가는중</div> : <div />}
      <input
        onChange={onChangeTitle}
        value={title}
        placeholder="제목을 입력하세요"
      />
      <input
        onChange={onChangeBody}
        value={body}
        placeholder="내용을 입력하세요"
      />
      <input
        onChange={onChangeReporter}
        value={reporter}
        placeholder="기자이름을 입력하세요"
      />
      <button onClick={onSubmit}>제출</button>
    </div>
  );
};

export default Write;
