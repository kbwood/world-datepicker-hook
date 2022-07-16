import React from 'react';
import { CDate } from '@kbwood/world-calendars';
import useDatepicker from '../useDatepicker';
import Controls from './Controls';
import MonthBody from './MonthBody';
import MonthHeader from './MonthHeader';
import Styles from './Styles';

type Props = {
  calendarName: string,
  date?: CDate,
  language?: string,
  maxDate?: CDate,
  minDate?: CDate,
  onSelect: (date: CDate) => void,
}

const Datepicker = ({ calendarName, date, language = '', maxDate, minDate, onSelect }: Props) => {
  const datepicker = useDatepicker({ calendarName, date, language, maxDate, minDate, onSelect });
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
