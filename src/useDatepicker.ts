import { MouseEventHandler, useEffect, useState } from 'react';
import Calendars, { CDate } from '@kbwood/world-calendars';

type NotifyDate = (date: CDate) => void
type CalendarDay = {
  date: CDate,
  isDisabled: boolean,
  isInCurrentMonth: boolean,
  isSelected: boolean,
  isToday: boolean,
  isWeekend: boolean,
  label: string,
  onClick: MouseEventHandler,
}
type DatepickerUpdates = {
  nextDay: MouseEventHandler,
  nextMonth: MouseEventHandler,
  nextWeek: MouseEventHandler,
  nextYear: MouseEventHandler,
  prevDay: MouseEventHandler,
  prevMonth: MouseEventHandler,
  prevWeek: MouseEventHandler,
  prevYear: MouseEventHandler,
  weekEnd: MouseEventHandler,
  weekStart: MouseEventHandler,
}
type MonthData = {
  name: string,
  num: number,
}
type Datepicker = {
  calendarDays: CalendarDay[],
  isRTL: boolean,
  month: MonthData,
  updates: DatepickerUpdates,
  weekDays: string[],
  year: number,
}

const generateDays = (onSelect: NotifyDate, curDate: CDate, setCurDate: NotifyDate): CalendarDay[] => {
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

  const days: CalendarDay[] = [];
  let forDay = monthStart;
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
    days.push(day);
    forDay = forDay.add(1, 'd');
  }
  return days;
};

const generateUpdates = (curDate: CDate, setCurDate: NotifyDate): DatepickerUpdates => {
  return {
    nextDay: () => { setCurDate(curDate.add(1, 'd')); },
    nextMonth: () => { setCurDate(curDate.add(1, 'm')); },
    nextWeek: () => { setCurDate(curDate.add(1, 'w')); },
    nextYear: () => { setCurDate(curDate.add(1, 'y')); },
    prevDay: () => { setCurDate(curDate.sub(1, 'd')); },
    prevMonth: () => { setCurDate(curDate.sub(1, 'm')); },
    prevWeek: () => { setCurDate(curDate.sub(1, 'w')); },
    prevYear: () => { setCurDate(curDate.sub(1, 'y')); },
    weekEnd: () => { setCurDate(curDate.add(1, 'd')); },
    weekStart: () => { setCurDate(curDate.sub(1, 'd')); }
  };
};

const generateDatepicker = (onSelect: NotifyDate, curDate: CDate, setCurDate: NotifyDate): Datepicker => {
  const calendar = curDate.calendar();
  return {
    calendarDays: generateDays(onSelect, curDate, setCurDate),
    isRTL: calendar.local.isRTL,
    month: {
      name: calendar.local.monthNames[curDate.month() - calendar.firstMonth],
      num: curDate.month()
    },
    updates: generateUpdates(curDate, setCurDate),
    weekDays: calendar.local.dayNamesMin,
    year: curDate.year()
  };
};

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

export type { CalendarDay, Datepicker, DatepickerUpdates, MonthData, NotifyDate };
export default useDatepicker;
