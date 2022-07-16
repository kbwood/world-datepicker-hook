import React from 'react';
import { Datepicker } from '../useDatepicker';

type Props = {
  datepicker: Datepicker
}

const MonthHeader = ({ datepicker: { current: { monthName, yearLocal }, local: { dayNamesMin } } }: Props) => (
  <thead>
    <tr key="month"><th colSpan={dayNamesMin.length}>{monthName} {yearLocal}</th></tr>
    <tr key="days">{dayNamesMin.map(day => <th key={day}>{day}</th>)}</tr>
  </thead>
);

export default MonthHeader;
