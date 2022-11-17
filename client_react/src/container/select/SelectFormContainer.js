import React, { useEffect, useState } from "react";
import { SelectForm } from "../../components/selection/SelectForm";
import { selectCompany } from "../../modules/slices/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SelectFormContainer = () => {
  const [select, setSelect] = useState([]);
  const { state } = useLocation();
  const dispatch = useDispatch();

  // useEffect(() =>{console.log(select)},[select])
  const onClick = (company) => {
    if (select.some((el) => el == company)) {
      const newArray = select.filter((note) => company !== note);
      setSelect(newArray);
    } else {
      setSelect([...select, company]);
    }
  };
  const navigate = useNavigate();

  const onSubmit = (e) => {
    dispatch(selectCompany({ _id: state, company: select }));
    navigate("/post?page=1&limit=20");
  };
  return <SelectForm onClick={onClick} onSubmit={onSubmit} />;
};

export default SelectFormContainer;
