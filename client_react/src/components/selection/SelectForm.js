import { useState } from "react";
import { companies } from "../../source/company/company";

const FormBox = ({ company, onClick }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      style={{
        height: "30px",
        width: "130px",
        background: toggle ? "skyblue" : "white",
        border: "1px black solid",
        borderRadius: "5px",
      }}
      onClick={() => {
        setToggle(!toggle);
        onClick(company);
        console.log("ㅋㅋ");
      }}
    >
      {company}
    </div>
  );
};

export const SelectForm = ({ onSubmit }) => {
  const [select, setSelect] = useState([]);

  const onClick = (company) => {
    setSelect([...select, company]);
  };

  return (
    <div>
      {companies.map((c) => (
        <FormBox key={c} company={c} onClick={onClick} />
      ))}
      <button onClick={() => onSubmit(select)}>제출</button>
    </div>
  );
};
