import React from 'react';
import { Props } from '../Controls';

const Controls = ({ datepicker: { current } }: Props) => {
  const message = `Controls (current ${current.date.toString()})`;
  return <div>{message}</div>;
};

export default Controls;
