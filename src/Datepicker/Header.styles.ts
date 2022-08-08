import styled from 'styled-components';

export const Select = styled.select`
  background-color: ${(props) => props.theme.color.monthBG};
  border: 0;
  color: ${(props) => props.theme.color.monthFG};
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.sizeHeader};
  font-weight: bold;
`;

export const TableHeader = styled.thead`
  th {
    padding: 0.5em;
  }
`;

export const MonthHeader = styled.tr`
  background-color: ${(props) => props.theme.color.monthBG};
  border: 1px solid ${(props) => props.theme.color.monthBG};
  color: ${(props) => props.theme.color.monthFG};
`;

export const WeekHeader = styled.tr`
  background-color: ${(props) => props.theme.color.weekBG};
  border: 1px solid ${(props) => props.theme.color.weekBG};
  color: ${(props) => props.theme.color.weekFG};
`;
