import styled from "styled-components";

const RowView = styled.View`
  flex-direction: row;
  justify-content: ${props => props.justifyContent};
  padding: 1px;
  margin: 5px;
`;

RowView.defaultProps = {
  justifyContent: "flex-start"
};

export default RowView;
