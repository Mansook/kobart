import styled from "styled-components";
const Input = styled.input`
  background: white;
  width: 180px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid black;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = ({ children, ...props }) => {
  return <Input {...props}>{children}</Input>;
};
export default StyledInput;
