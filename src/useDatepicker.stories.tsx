import React, { useCallback } from 'react';
import { CDate } from '@kbwood/world-calendars';
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
import useDatepicker, { Datepicker } from './useDatepicker';

type DatepickerProps = {
  datepicker: Datepicker
}
type Props = {
  calendarName: string
  language: string
}

export default {
  title: 'Datepicker',
  argTypes: {
    calendarName: {
      control: 'select',
      options: ['Coptic', 'Discworld', 'Ethiopian', 'Gregorian', 'Hebrew', 'Islamic', 'Julian', 'Mayan', 'Nanakshahi', 'Nepali', 'Persian', 'Taiwan', 'Thai', 'UmmAlQura']
    },
    language: {
      control: 'select',
      options: ['  (Default)', 'am (Ethiopian)', 'ar (Gregorian, Islamic, Umm al-Qura)', 'fa (Persian)', 'fr (Gregorian, Julian)', 'he (Gregorian)', 'ne (Nepali)', 'pa (Nanakshahi)', 'th (Thai)', 'zh-TW (Taiwan)', 'zh-CN (Gregorian)']
    }
  }
};

const Styles = () => {
  const styles = `
    .datepicker { width: 18em; }
    .datepicker.ltr { direction: ltr; }
    .datepicker.rtl { direction: rtl; }
    .datepicker button { background-color: transparent; border: 0; cursor: pointer; padding: 0.5em; }
    .datepicker table { width: 100%; }
    .datepicker table button { width: 100%; }
    .datepicker td { text-align: center; }
    .datepicker .controls { display: flex; justify-content: space-between; }
    .datepicker .weekend { background-color: #ccc; }
    .datepicker .today { background-color: #f00; }
    .datepicker .today button { color: #fff; }
    .datepicker .selected { background-color: #00f; }
    .datepicker .selected button { color: #fff; }
  `;
  return <style>{styles}</style>;
};

const Controls = ({ datepicker: { updates } }: DatepickerProps) => (
  <div className="controls">
    <button onClick={updates.prevYear} type="button">&lt;&lt;</button>
    <button onClick={updates.prevMonth} type="button">&lt;</button>
    <button onClick={updates.nextMonth} type="button">&gt;</button>
    <button onClick={updates.nextYear} type="button">&gt;&gt;</button>
  </div>
);

const MonthHeader = ({ datepicker: { month, weekDays, year } }: DatepickerProps) => (
  <thead>
    <tr key="month"><th colSpan={weekDays.length}>{month.name} {year}</th></tr>
    <tr key="days">{weekDays.map(day => <th key={day}>{day}</th>)}</tr>
  </thead>
);

const MonthBody = ({ datepicker: { calendarDays, weekDays } }: DatepickerProps) => {
  const daysInWeek = weekDays.length;
  const countWeeks = calendarDays.length / daysInWeek;
  const weeks = [];
  for (let w = 0; w < countWeeks; w += 1) {
    const week = calendarDays.slice(w * daysInWeek, (w + 1) * daysInWeek);
    weeks.push(
      <tr key={`w${week[0].date.toString()}`}>
        {weekDays.map((_, d) => {
          const {
            date,
            isDisabled,
            isInCurrentMonth,
            isSelected,
            isToday,
            isWeekend,
            label,
            onClick
          } = week[d];
          const className = `${isInCurrentMonth ? '' : 'other'} ${
            isSelected ? 'selected' : ''
          } ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}`;
          return (
            <td key={date.toString()} className={className}>
              <button disabled={isDisabled} onClick={onClick} type="button">
                {label}
              </button>
            </td>
          );
        })}
      </tr>
    );
  }
  return <tbody>{weeks}</tbody>;
};

const Template = ({ calendarName = 'Gregorian', language = '' }: Props) => {
  const onSelect = useCallback((date: CDate) => {
    alert(`You selected ${date.toString()}`);
  }, []);
  const datepicker = useDatepicker(onSelect, calendarName, language.split(' ')[0]);
  return (
    <div className={`datepicker ${datepicker.isRTL ? 'rtl' : 'ltr'}`}>
      <Styles />
      <Controls datepicker={datepicker} />
      <table>
        <MonthHeader datepicker={datepicker} />
        <MonthBody datepicker={datepicker} />
      </table>
    </div>
  );
};

export const Default = Template.bind({});
