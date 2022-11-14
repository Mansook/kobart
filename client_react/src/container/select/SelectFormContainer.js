import React, { useEffect, useState } from "react";
import { SelectForm } from "../../components/selection/SelectForm";
import { selectCompany } from "../../lib/api/select/select";
import { useLocation } from "react-router-dom";

const SelectFormContainer = () => {
  const [select, setSelect] = useState([]);
  const { state } = useLocation();
  const onClick = (company) => {
    setSelect([...select, company]);
  };

  const onSubmit = (e) => {
    selectCompany({ _id: state, company: select });
  };
  return <SelectForm onClick={onClick} onSubmit={onSubmit} />;
};

export default SelectFormContainer;
