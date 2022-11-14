import { useState } from "react";
import { selectCompany } from "../../lib/api/select/select";
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
      }}
    >
      {company}
    </div>
  );
};

export const SelectForm = ({ onClick, onSubmit }) => {
  return (
    <div>
      {companies.map((c) => (
        <FormBox key={c} company={c} onClick={onClick} />
      ))}
      <button onClick={onSubmit}>제출</button>
    </div>
  );
};
