import React from 'react';
import { Props } from '../Header';

const Header = ({ datepicker: { current: { monthName, yearLocal }, local: { days } } }: Props) => {
  const message = `${monthName} ${yearLocal}`;
  return (
    <thead>
      <tr key="month"><th colSpan={days.length}>{message}</th></tr>
    </thead>
  );
};

export default Header;
