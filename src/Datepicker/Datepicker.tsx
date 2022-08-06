import React from 'react';
import { CDate } from '@kbwood/world-calendars';
import useDatepicker, { DisplayOptions } from '../useDatepicker';
import Body from './Body';
import Controls from './Controls';
import Header from './Header';
import Styles from './Styles';
import { Localisation } from './types';

type Props = {
  calendarName: string,
  date?: CDate,
  language?: string,
  maxDate?: CDate,
  minDate?: CDate,
  onSelect: (date: CDate) => void,
  options?: DisplayOptions,
}
type LocalisationsMap = {
  [index: string]: Localisation,
}

const localisations: LocalisationsMap = {
  '': {
    clear: 'Clear',
    clearLabel: 'Clear all the dates',
    close: 'Close',
    closeLabel: 'Close the datepicker',
    // current: 'Current',
    // currentLabel: 'Show the current month',
    dayLabel: 'Select DD, M d, yyyy',
    defaultLabel: 'Select a date',
    // earlier: '&#160;&#160;▲',
    // later: '&#160;&#160;▼',
    isRTL: false,
    monthLabel: 'Change the month',
    nextMonth: '>',
    nextMonthLabel: 'Show the next month',
    nextYear: '>>',
    nextYearLabel: 'Show the next year',
    prevMonth: '<',
    prevMonthLabel: 'Show the previous month',
    prevYear: '<<',
    prevYearLabel: 'Show the previous year',
    today: 'Today',
    todayLabel: 'Show today\'s month',
    week: 'Wk',
    weekLabel: 'Week of the year',
    yearLabel: 'Change the year'
  }
};

const noOptions: DisplayOptions = {};

const Datepicker = ({ calendarName, date, language = '', maxDate, minDate, onSelect, options = noOptions }: Props) => {
  const datepicker = useDatepicker({ calendarName, date, language, maxDate, minDate, onSelect, options });
  const local = localisations[language || ''] || localisations[''];
  const monthLabel = `${datepicker.current.monthName} ${datepicker.current.year}`;
  return (
    <div className={`datepicker ${datepicker.local.isRTL ? 'rtl' : 'ltr'}`}>
      <Styles />
      <Controls datepicker={datepicker} local={local} />
      <table aria-label={monthLabel}>
        <Header datepicker={datepicker} local={local} options={options} />
        <Body datepicker={datepicker} />
      </table>
    </div>
  );
};

export { localisations };
export type { Props };
export default Datepicker;
