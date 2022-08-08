import styled from 'styled-components';

type DayProps = {
  inCurrentMonth?: boolean,
  selected?: boolean,
  today?: boolean,
  weekend?: boolean,
}

export const TableBody = styled.tbody`
  font-size: ${(props) => props.theme.font.sizeBody};
`;

const getColorName = (props: DayProps, suffix: string): string => {
  if (!props.inCurrentMonth) {
    return props.weekend ? `weekend${suffix}` : `otherMonth${suffix}`;
  }
  if (props.selected) {
    return `selected${suffix}`;
  }
  if (props.today) {
    return `today${suffix}`;
  }
  if (props.weekend) {
    return `weekend${suffix}`;
  }
  return `day${suffix}`;
};

export const DayCell = styled.td<DayProps>`
  background-color: ${(props) => props.theme.color[getColorName(props, 'BG')]};
  border: 1px solid ${(props) => props.theme.color.dayBorder};
  padding: 0;
  text-align: center;
  button {
    color: ${(props) => props.theme.color[getColorName(props, 'FG')]};
  }
`;

export const DayButton = styled.button.attrs(({ onClick }) => ({
  onclick: onClick
}))`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  font-family: ${(props) => props.theme.font.family};
  font-size: ${(props) => props.theme.font.sizeBody};
  padding: 0.5em 0;
  width: 100%;
  &:disabled {
    color: ${(props) => props.theme.color.unselectableFG};
  }
  &[tabIndex="0"] {
    font-weight: ${(props) => props.theme.font.selectedWeight};
  }
`;
