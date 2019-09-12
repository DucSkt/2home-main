import styled from 'styled-components';
import { Colors } from '../themes';

const Divider = styled.View`
  border-radius: ${props => props.borderRadius};
  background: ${props => props.color};
  margin: 0 ${props => props.width}px;
  padding: ${props => props.height / 2}px 0;
`;

Divider.defaultProps = {
  height: 5,
  width: 130,
  color: Colors.white,
  borderRadius: 50
};

export default Divider;
