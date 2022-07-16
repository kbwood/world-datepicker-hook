import React from 'react';
import { CDate } from '@kbwood/world-calendars';
import useDatepicker from '../useDatepicker';
import Controls from './Controls';
import MonthBody from './MonthBody';
import MonthHeader from './MonthHeader';
import Styles from './Styles';

type Props = {
  calendarName: string
  language?: string
  onSelect: (date: CDate) => void
}

const Datepicker = ({ calendarName, language = '', onSelect }: Props) => {
  const datepicker = useDatepicker(onSelect, calendarName, language);
  return (
    <div className={`datepicker ${datepicker.local.isRTL ? 'rtl' : 'ltr'}`}>
      <Styles />
      <Controls datepicker={datepicker} />
      <table>
        <MonthHeader datepicker={datepicker} />
        <MonthBody datepicker={datepicker} />
      </table>
    </div>
  );
};

export default Datepicker;
