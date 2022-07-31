import React from 'react';
import { CDate } from '@kbwood/world-calendars';
import useDatepicker, { DisplayOptions } from '../useDatepicker';
import Body from './Body';
import Controls from './Controls';
import Header from './Header';
import Styles from './Styles';

type Props = {
  calendarName: string,
  date?: CDate,
  language?: string,
  maxDate?: CDate,
  minDate?: CDate,
  onSelect: (date: CDate) => void,
  options?: DisplayOptions,
}

const noOptions: DisplayOptions = {};

const Datepicker = ({ calendarName, date, language = '', maxDate, minDate, onSelect, options = noOptions }: Props) => {
  const datepicker = useDatepicker({ calendarName, date, language, maxDate, minDate, onSelect, options });
  const monthLabel = `${datepicker.current.monthName} ${datepicker.current.year}`;
  return (
    <div className={`datepicker ${datepicker.local.isRTL ? 'rtl' : 'ltr'}`}>
      <Styles />
      <Controls datepicker={datepicker} />
      <table aria-label={monthLabel}>
        <Header datepicker={datepicker} options={options} />
        <Body datepicker={datepicker} />
      </table>
    </div>
  );
};

export type { Props };
export default Datepicker;
