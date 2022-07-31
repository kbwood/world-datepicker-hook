import React from 'react';
import { Props } from '../Body';

const Body = ({ datepicker: { days } }: Props) => (
  <tbody>
    {days.map((_, i) => (
      <tr key={i}><td>{`Week ${i}`}</td></tr>
    ))}
  </tbody>
);

export default Body;
