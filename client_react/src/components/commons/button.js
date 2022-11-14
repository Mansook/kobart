import styled from "styled-components";

export const StyledButton = styled.button`
  border-radius: 5px;
  border: 2px solid pink;
  height: 30px;
  width: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: gray;
  }
`;

export default StyledButton;
