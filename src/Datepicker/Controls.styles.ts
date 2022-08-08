import styled from 'styled-components';

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.controlsBG};
  font-weight: bold;
`;

export const Button = styled.button`
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.color.controlsFG};
  cursor: pointer;
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.sizeHeader};
  font-weight: bold;
  padding: 0.5em;
`;
