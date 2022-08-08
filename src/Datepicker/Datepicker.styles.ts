import styled from 'styled-components';

type DatepickerProps = {
  isRTL: boolean,
}

export const Datepicker = styled.div<DatepickerProps>`
  border: 1px solid ${(props) => props.theme.color.border};
  direction: ${(props) => props.isRTL ? 'rtl' : 'ltr'};
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.sizeHeader};
  width: 18em;
`;

export const MonthTable = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
