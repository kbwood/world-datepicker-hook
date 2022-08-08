import React from 'react';
import { Datepicker } from '../useDatepicker';
import * as S from './Controls.styles';
import { Localisation } from './types';

type Props = {
  datepicker: Datepicker,
  local: Localisation,
}

const Controls = ({ datepicker: { updates }, local }: Props) => (
  <S.Controls>
    <S.Button aria-label={local.prevYearLabel} onClick={() => { updates.prevYear(); }} type="button">
      {local.prevYear}
    </S.Button>
    <S.Button aria-label={local.prevMonthLabel} onClick={() => { updates.prevMonth(); }} type="button">
      {local.prevMonth}
    </S.Button>
    <S.Button aria-label={local.todayLabel} onClick={() => { updates.today(); }} type="button">
      {local.today}
    </S.Button>
    <S.Button aria-label={local.nextMonthLabel} onClick={() => { updates.nextMonth(); }} type="button">
      {local.nextMonth}
    </S.Button>
    <S.Button aria-label={local.nextYearLabel} onClick={() => { updates.nextYear(); }} type="button">
      {local.nextYear}
    </S.Button>
  </S.Controls>
);

export type { Props };
export default Controls;
