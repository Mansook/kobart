import { SelectForm } from "../../components/selection/SelectForm";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData } from "../../modules/slices/auth";
import { selectCompany } from "../../lib/api/select/select";
import { useNavigate } from "react-router-dom";
export const SelectFomContainer = ({ _id }) => {
  const onSubmit = (company) => {
    selectCompany({
      _id: _id,
      company: company,
    });
  };
  return <SelectForm onSubmit={onSubmit} />;
};
