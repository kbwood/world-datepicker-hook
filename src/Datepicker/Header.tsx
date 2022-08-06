import React from 'react';
import { Datepicker, DisplayOptions } from '../useDatepicker';
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
    <select aria-label={local.monthLabel} onChange={(e) => { setMonth(e.target.value); }} value={month}>
      {months.map(({ disabled, name, value }) => <option key={name} disabled={disabled} value={value}>{name}</option>)}
    </select>
  );
};

const getYear = (datepicker: Datepicker, local: Localisation, options: DisplayOptions) => {
  const { current: { year, yearLocal }, local: { years }, updates: { setYear } } = datepicker;
  if (!options.selectYear) {
    return yearLocal;
  }
  return (
    <select aria-label={local.yearLabel} onChange={(e) => { setYear(e.target.value); }} value={year}>
      {years.map(({ name, value }) => <option key={name} value={value}>{name}</option>)}
    </select>
  );
};

const Header = ({ datepicker, local, options }: Props) => {
  const { local: { days } } = datepicker;
  return (
    <thead>
      <tr key="month">
        <th colSpan={days.length}>
          {getMonth(datepicker, local, options)} {getYear(datepicker, local, options)}
        </th>
      </tr>
      <tr key="days">
        {days.map(({ name, nameMin }) => (
          <th key={name}>
            <abbr title={name}>{nameMin}</abbr>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export type { Props };
export default Header;
