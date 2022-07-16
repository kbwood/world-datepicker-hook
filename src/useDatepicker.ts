import { MouseEventHandler, useEffect, useState } from 'react';
import Calendars, { CDate } from '@kbwood/world-calendars';

type NotifyDate = (date: CDate) => void
type Current = {
  month: number,
  monthName: string,
  monthNameShort: string,
  year: number,
  yearLocal: string,
}
type Day = {
  date: CDate,
  isDisabled: boolean,
  isInCurrentMonth: boolean,
  isSelected: boolean,
  isToday: boolean,
  isWeekend: boolean,
  label: string,
  onClick: MouseEventHandler,
}
type Local = {
  dayNames: string[],
  dayNamesMin: string[],
  dayNamesShort: string[],
  isRTL: boolean,
  monthNames: string[],
  monthNamesShort: string[],
}
type Updates = {
  nextDay: MouseEventHandler,
  nextMonth: MouseEventHandler,
  nextWeek: MouseEventHandler,
  nextYear: MouseEventHandler,
  prevDay: MouseEventHandler,
  prevMonth: MouseEventHandler,
  prevWeek: MouseEventHandler,
  prevYear: MouseEventHandler,
  today: MouseEventHandler,
  weekEnd: MouseEventHandler,
  weekStart: MouseEventHandler,
}
type Datepicker = {
  current: Current,
  days: Day[][],
  local: Local,
  updates: Updates,
}

const generateCurrent = (curDate: CDate): Current => {
  const calendar = curDate.calendar();
  const yearString = `${curDate.year()}`;
  return {
    month: curDate.month(),
    monthName: calendar.local.monthNames[curDate.month() - calendar.firstMonth],
    monthNameShort: calendar.local.monthNamesShort[curDate.month() - calendar.firstMonth],
    year: curDate.year(),
    yearLocal: calendar.local.localiseDigits ? calendar.local.localiseDigits(yearString) : yearString
  };
};

const generateDays = (onSelect: NotifyDate, curDate: CDate, setCurDate: NotifyDate): Day[][] => {
  const calendar = curDate.calendar();
  const localiseDigits = calendar.local.localiseDigits || (value => value);
  const today = calendar.date();
  const daysInWeek = calendar.daysInWeek();
  const monthFirst = curDate.set(calendar.minDay, 'd');
  const monthCalc = monthFirst
    .sub(monthFirst.dayOfWeek(), 'd')
    .add(calendar.local.firstDay, 'd');
  const monthStart =
    monthCalc.month() === curDate.month() && monthCalc.day() > calendar.minDay ? monthCalc.sub(1, 'w') : monthCalc;
  const monthLast = monthFirst.add(1, 'm').sub(1, 'd');
  const weekCount = Math.ceil(
    (monthLast.toJD() - monthStart.toJD() + 1) / daysInWeek
  );
  const monthEnd = monthStart.add(weekCount, 'w').sub(1, 'd');

  const days: Day[][] = [];
  let forDay = monthStart;
  let week = 0;
  while (forDay.compareTo(monthEnd) <= 0) {
    const thisDay = forDay.date();
    const day = {
      date: thisDay,
      isDisabled: false,
      isInCurrentMonth: thisDay.month() === curDate.month(),
      isSelected: thisDay.compareTo(curDate) === 0,
      isToday: thisDay.compareTo(today) === 0,
      isWeekend: !thisDay.weekDay(),
      label: `${localiseDigits(String(thisDay.day()))}`,
      onClick: () => { setCurDate(thisDay); onSelect(thisDay); }
    };
    if (!days[week]) {
      days[week] = [];
    }
    days[week].push(day);
    forDay = forDay.add(1, 'd');
    if (forDay.dayOfWeek() === calendar.local.firstDay) {
      week += 1;
    }
  }
  return days;
};

const generateLocal = (curDate: CDate): Local => {
  const { dayNames, dayNamesMin, dayNamesShort, firstDay, isRTL, monthNames, monthNamesShort } = curDate.calendar().local;
  return {
    dayNames: [...dayNames.slice(firstDay), ...dayNames.slice(0, firstDay)],
    dayNamesMin: [...dayNamesMin.slice(firstDay), ...dayNamesMin.slice(0, firstDay)],
    dayNamesShort: [...dayNamesShort.slice(firstDay), ...dayNamesShort.slice(0, firstDay)],
    isRTL,
    monthNames,
    monthNamesShort
  };
};

const getStartOfWeek = (date: CDate): CDate =>
  date.sub(date.dayOfWeek(), 'd').add(date.calendar().local.firstDay, 'd');

const getEndOfWeek = (date: CDate): CDate =>
  getStartOfWeek(date).add(date.calendar().daysInWeek() - 1, 'd');

const generateUpdates = (curDate: CDate, setCurDate: NotifyDate): Updates => {
  return {
    nextDay: () => { setCurDate(curDate.add(1, 'd')); },
    nextMonth: () => { setCurDate(curDate.add(1, 'm')); },
    nextWeek: () => { setCurDate(curDate.add(1, 'w')); },
    nextYear: () => { setCurDate(curDate.add(1, 'y')); },
    prevDay: () => { setCurDate(curDate.sub(1, 'd')); },
    prevMonth: () => { setCurDate(curDate.sub(1, 'm')); },
    prevWeek: () => { setCurDate(curDate.sub(1, 'w')); },
    prevYear: () => { setCurDate(curDate.sub(1, 'y')); },
    today: () => { setCurDate(curDate.calendar().date()); },
    weekEnd: () => { setCurDate(getEndOfWeek(curDate)); },
    weekStart: () => { setCurDate(getStartOfWeek(curDate)); }
  };
};

const generateDatepicker = (onSelect: NotifyDate, curDate: CDate, setCurDate: NotifyDate): Datepicker => ({
  current: generateCurrent(curDate),
  days: generateDays(onSelect, curDate, setCurDate),
  local: generateLocal(curDate),
  updates: generateUpdates(curDate, setCurDate)
});

const useDatepicker = (onSelect: NotifyDate, calendarName: string, language: string = '', date?: CDate) => {
  const calendar = Calendars.instance(calendarName, language);
  const [curDate, setCurDate] = useState<CDate>(date || calendar.date());
  const [datepicker, setDatepicker] = useState<Datepicker>(generateDatepicker(onSelect, curDate, setCurDate));

  useEffect(() => {
    const newDate = date || calendar.date();
    if (newDate.calendar() !== curDate.calendar() || newDate.compareTo(curDate) !== 0) {
      setCurDate(newDate);
    }
  }, [calendar, date]);

  useEffect(() => {
    setDatepicker(generateDatepicker(onSelect, curDate, setCurDate));
  }, [curDate, onSelect, setCurDate, setDatepicker]);

  return datepicker;
};

export type { Current, Datepicker, Day, Local, NotifyDate, Updates };
export default useDatepicker;
