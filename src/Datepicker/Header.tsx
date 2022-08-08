import React from 'react';
import { Datepicker, DisplayOptions } from '../useDatepicker';
import * as S from './Header.styles';
import { Localisation } from './types';

type Props = {
  datepicker: Datepicker,
  local: Localisation,
  options: DisplayOptions,
}

const getMonth = (datepicker: Datepicker, local: Localisation, options: DisplayOptions) => {
  const { current: { month, monthName }, local: { months }, updates: { setMonth } } = datepicker;
  if (!options.selectMonth) {
    return monthName;
  }
  return (
    <S.Select aria-label={local.monthLabel} onChange={(e) => { setMonth(e.target.value); }} value={month}>
      {months.map(({ disabled, name, value }) => <option key={name} disabled={disabled} value={value}>{name}</option>)}
    </S.Select>
  );
};

const getYear = (datepicker: Datepicker, local: Localisation, options: DisplayOptions) => {
  const { current: { year, yearLocal }, local: { years }, updates: { setYear } } = datepicker;
  if (!options.selectYear) {
    return yearLocal;
  }
  return (
    <S.Select aria-label={local.yearLabel} onChange={(e) => { setYear(e.target.value); }} value={year}>
      {years.map(({ name, value }) => <option key={name} value={value}>{name}</option>)}
    </S.Select>
  );
};

const Header = ({ datepicker, local, options }: Props) => {
  const { local: { days } } = datepicker;
  return (
    <S.TableHeader>
      <S.MonthHeader key="month">
        <th colSpan={days.length}>
          {getMonth(datepicker, local, options)} {getYear(datepicker, local, options)}
        </th>
      </S.MonthHeader>
      <S.WeekHeader key="week">
        {days.map(({ name, nameMin }) => (
          <th key={name}>
            <abbr title={name}>{nameMin}</abbr>
          </th>
        ))}
      </S.WeekHeader>
    </S.TableHeader>
  );
};

export type { Props };
export default Header;
