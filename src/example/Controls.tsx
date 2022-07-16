import React from 'react';
import { Datepicker } from '../useDatepicker';

type Props = {
  datepicker: Datepicker
}

const Controls = ({ datepicker: { updates } }: Props) => (
  <div className="controls">
    <button onClick={updates.prevYear} type="button">&lt;&lt;</button>
    <button onClick={updates.prevMonth} type="button">&lt;</button>
    <button onClick={updates.today} type="button">Today</button>
    <button onClick={updates.nextMonth} type="button">&gt;</button>
    <button onClick={updates.nextYear} type="button">&gt;&gt;</button>
  </div>
);

export default Controls;
