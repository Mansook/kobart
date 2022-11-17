import React, { useEffect, useRef } from "react";

const Write = ({
  date,
  image,
  loading,
  title,
  body,
  reporter,
  onSubmit,
  onChangeField,
}) => {
  // const quillElement = useRef(null);
  // const quillInstance = useRef(null);

  const onChangeTitle = (e) => {
    onChangeField({ key: "title", value: e.target.value });
  };
  const onChangeBody = (e) => {
    onChangeField({ key: "body", value: e.target.value });
  };
  const onChangeReporter = (e) => {
    onChangeField({ key: "reporter", value: e.target.value });
  };
  const onChangeDate = (e) => {
    onChangeField({ key: "date", value: e.target.value });
  };
  const onChangeImage = (e) => {
    onChangeField({ key: "image", value: e.target.value });
  };

  return (
    <div className="write_grid">
      {loading ? <div>딥러닝돌아가는중</div> : <div />}
      <div className="small_div">
        <div> 제목: </div>
        <input
          style={{ width: "300px" }}
          onChange={onChangeTitle}
          value={title}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div>
        <div> 기자명: </div>
        <input
          style={{ width: "300px" }}
          onChange={onChangeReporter}
          value={reporter}
          placeholder="기자이름을 입력하세요"
        />
      </div>
      <div>
        <div> 날짜: </div>
        <input
          style={{ width: "300px" }}
          onChange={onChangeDate}
          value={date}
          placeholder="내용을 입력하세요"
        />
      </div>
      <div>
        <div> 사진: </div>
        <input
          style={{ width: "300px" }}
          onChange={onChangeImage}
          value={image}
          placeholder="내용을 입력하세요"
        />
      </div>
      <div>
        <div> 기사: </div>
        <textarea
          style={{ height: "200px", width: "300px" }}
          onChange={onChangeBody}
          value={body}
          placeholder="내용을 입력하세요"
        />
      </div>

      <br />
      <button onClick={onSubmit}>제출</button>
    </div>
  );
};

export default Write;
