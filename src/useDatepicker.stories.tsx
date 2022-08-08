import React, { useCallback } from 'react';
import { Story } from '@storybook/react';
import Calendars, { CalendarBase, CDate } from '@kbwood/world-calendars';
import '@kbwood/world-calendars/lib/Coptic';
import '@kbwood/world-calendars/lib/Discworld';
import '@kbwood/world-calendars/lib/Ethiopian';
import '@kbwood/world-calendars/lib/l10n/Ethiopian-am';
import '@kbwood/world-calendars/lib/Gregorian';
import '@kbwood/world-calendars/lib/l10n/Gregorian-ar';
import '@kbwood/world-calendars/lib/l10n/Gregorian-fr';
import '@kbwood/world-calendars/lib/l10n/Gregorian-zh-CN';
import '@kbwood/world-calendars/lib/Hebrew';
import '@kbwood/world-calendars/lib/l10n/Hebrew-he';
import '@kbwood/world-calendars/lib/Islamic';
import '@kbwood/world-calendars/lib/l10n/Islamic-ar';
import '@kbwood/world-calendars/lib/Julian';
import '@kbwood/world-calendars/lib/l10n/Julian-fr';
import '@kbwood/world-calendars/lib/Mayan';
import '@kbwood/world-calendars/lib/Nanakshahi';
import '@kbwood/world-calendars/lib/l10n/Nanakshahi-pa';
import '@kbwood/world-calendars/lib/Nepali';
import '@kbwood/world-calendars/lib/l10n/Nepali-ne';
import '@kbwood/world-calendars/lib/Persian';
import '@kbwood/world-calendars/lib/l10n/Persian-fa';
import '@kbwood/world-calendars/lib/Taiwan';
import '@kbwood/world-calendars/lib/l10n/Taiwan-zh-TW';
import '@kbwood/world-calendars/lib/Thai';
import '@kbwood/world-calendars/lib/l10n/Thai-th';
import '@kbwood/world-calendars/lib/UmmAlQura';
import '@kbwood/world-calendars/lib/l10n/UmmAlQura-ar';
import Datepicker from './Datepicker';
import './Datepicker/l10n/Datepicker-ar';
import './Datepicker/l10n/Datepicker-fr';
import './Datepicker/l10n/Datepicker-zh-CN';
import { Theme } from './Datepicker/theme';

type Props = {
  alternateTheme: boolean,
  calendarName: string,
  calendarLanguage: string,
  date: string,
  maxDate: string,
  minDate: string,
  selectDaysInOtherMonths: boolean,
  selectMonth: boolean,
  selectYear: boolean,
  showDaysInOtherMonths: boolean,
}

const altTheme: Theme = {
  color: {
    border: '#264053',
    controlsBG: '#fff',
    controlsFG: '#000',
    dayBG: '#dfeffc',
    dayBorder: '#c5dbec',
    dayFG: '#000',
    monthBG: '#264053',
    monthFG: '#fff',
    otherMonthBG: '#fff',
    otherMonthFG: '#000',
    selectedBG: '#264053',
    selectedFG: '#fff',
    todayBG: '#fad42e',
    todayFG: '#000',
    unselectableFG: '#888',
    weekBG: '#fff',
    weekFG: '#000',
    weekendBG: '#d0e5f5',
    weekendFG: '#000'
  },
  font: {
    family: '"Times New Roman",serif',
    selectedWeight: 'bold',
    sizeBody: '24px',
    sizeHeader: '28px'
  }
};

export default {
  title: 'Datepicker',
  argTypes: {
    alternateTheme: { control: 'boolean' },
    calendarName: {
      control: 'select',
      options: ['Coptic', 'Discworld', 'Ethiopian', 'Gregorian', 'Hebrew', 'Islamic', 'Julian',
        'Mayan', 'Nanakshahi', 'Nepali', 'Persian', 'Taiwan', 'Thai', 'UmmAlQura']
    },
    calendarLanguage: {
      control: 'select',
      options: ['  (Default)', 'am (Ethiopian)', 'ar (Gregorian, Islamic, Umm al-Qura)',
        'fa (Persian)', 'fr (Gregorian, Julian)', 'he (Hebrew)', 'ne (Nepali)',
        'pa (Nanakshahi)', 'th (Thai)', 'zh-TW (Taiwan)', 'zh-CN (Gregorian)']
    },
    date: { control: 'text' },
    maxDate: { control: 'text' },
    minDate: { control: 'text' },
    selectDaysInOtherMonths: { control: 'boolean' },
    selectMonth: { control: 'boolean' },
    selectYear: { control: 'boolean' },
    showDaysInOtherMonths: { control: 'boolean' }
  }
};

const getDate = (calendar: CalendarBase, date: string = ''): CDate | undefined => {
  const dateParts = date.split('-');
  if (dateParts.length !== 3) {
    return undefined;
  }
  const dateNumbers = dateParts.map(part => Number(part));
  if (dateNumbers.some(num => isNaN(num))) {
    return undefined;
  }
  try {
    return calendar.date(dateNumbers[0], dateNumbers[1], dateNumbers[2]);
  } catch (e) {
    return undefined;
  }
};

const Template: Story<Props> = ({
  alternateTheme,
  calendarName = 'Gregorian',
  calendarLanguage = '',
  date: inDate,
  maxDate: inMaxDate,
  minDate: inMinDate,
  selectDaysInOtherMonths,
  selectMonth,
  selectYear,
  showDaysInOtherMonths
}: Props) => {
  const onSelect = useCallback((date: CDate) => {
    alert(`You selected ${date.toString()}`);
  }, []);
  const language = calendarLanguage.split(' ')[0];
  const calendar = Calendars.instance(calendarName, language);
  const options = { selectDaysInOtherMonths, selectMonth, selectYear, showDaysInOtherMonths, yearRange: '2000:2040' };
  const theme = alternateTheme ? altTheme : undefined;
  return <Datepicker
    calendarName={calendarName}
    date={getDate(calendar, inDate)}
    language={language}
    maxDate={getDate(calendar, inMaxDate)}
    minDate={getDate(calendar, inMinDate)}
    onSelect={onSelect}
    options={options}
    theme={theme}
  />;
};

export const Default = Template.bind({});
Default.args = {
  alternateTheme: false,
  calendarName: 'Gregorian',
  calendarLanguage: '  (Default)',
  date: 'yyyy-mm-dd',
  maxDate: 'yyyy-mm-dd',
  minDate: 'yyyy-mm-dd',
  selectDaysInOtherMonths: true,
  selectMonth: false,
  selectYear: false,
  showDaysInOtherMonths: true
};
