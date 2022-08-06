import React from 'react';
import { Datepicker } from '../useDatepicker';
import { Localisation } from './types';

type Props = {
  datepicker: Datepicker,
  local: Localisation,
}

const Controls = ({ datepicker: { updates }, local }: Props) => (
  <div className="controls">
    <button aria-label={local.prevYearLabel} onClick={() => { updates.prevYear(); }} type="button">
      {local.prevYear}
    </button>
    <button aria-label={local.prevMonthLabel} onClick={() => { updates.prevMonth(); }} type="button">
      {local.prevMonth}
    </button>
    <button aria-label={local.todayLabel} onClick={() => { updates.today(); }} type="button">
      {local.today}
    </button>
    <button aria-label={local.nextMonthLabel} onClick={() => { updates.nextMonth(); }} type="button">
      {local.nextMonth}
    </button>
    <button aria-label={local.nextYearLabel} onClick={() => { updates.nextYear(); }} type="button">
      {local.nextYear}
    </button>
  </div>
);

export type { Props };
export default Controls;
