import React, { useEffect, useState } from "react";
import { SelectForm } from "../../components/selection/SelectForm";
import { selectCompany } from "../../lib/api/select/select";
import { useLocation, useNavigate } from "react-router-dom";

const SelectFormContainer = () => {
  const [select, setSelect] = useState([]);
  const { state } = useLocation();
  
  // useEffect(() =>{console.log(select)},[select])
  const onClick = (company) => {
    if(select.some((el) => el == company)){
      const newArray= select.filter((note) => company !== note);
      setSelect(newArray);
    }
    else{
      setSelect([...select, company]);
    }
  };
  const navigate = useNavigate();

  const onSubmit = (e) => {
    selectCompany({ _id: state, company: select });
    console.log(select, state);
    navigate("/post");
  };
  return <SelectForm onClick={onClick} onSubmit={onSubmit} />;
};

export default SelectFormContainer;
