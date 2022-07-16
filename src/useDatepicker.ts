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
type Props = {
  calendarName: string,
  date?: CDate,
  language?: string,
  maxDate?: CDate,
  minDate?: CDate,
  onSelect: NotifyDate,
}
type OptCDate = CDate | undefined

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

const generateDays = (
  onSelect: NotifyDate,
  curDate: CDate,
  setCurDate: NotifyDate,
  minDate: OptCDate,
  maxDate: OptCDate
): Day[][] => {
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
    const isDisabled = (!!minDate && thisDay.compareTo(minDate) === -1) ||
      (!!maxDate && thisDay.compareTo(maxDate) === 1);
    const day = {
      date: thisDay,
      isDisabled,
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
  const { dayNames, dayNamesMin, dayNamesShort, firstDay, isRTL, monthNames, monthNamesShort } =
    curDate.calendar().local;
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

const max = (d1: CDate, d2: CDate = d1): CDate => d1.compareTo(d2) === 1 ? d1 : d2;

const min = (d1: CDate, d2: CDate = d1): CDate => d1.compareTo(d2) === -1 ? d1 : d2;

const generateUpdates = (curDate: CDate, setCurDate: NotifyDate, minDate: OptCDate, maxDate: OptCDate): Updates => {
  const setTarget = (target: CDate) => () => { setCurDate(max(min(target, maxDate), minDate)); };
  return {
    nextDay: setTarget(curDate.add(1, 'd')),
    nextMonth: setTarget(curDate.add(1, 'm')),
    nextWeek: setTarget(curDate.add(1, 'w')),
    nextYear: setTarget(curDate.add(1, 'y')),
    prevDay: setTarget(curDate.sub(1, 'd')),
    prevMonth: setTarget(curDate.sub(1, 'm')),
    prevWeek: setTarget(curDate.sub(1, 'w')),
    prevYear: setTarget(curDate.sub(1, 'y')),
    today: setTarget(curDate.calendar().date()),
    weekEnd: setTarget(getEndOfWeek(curDate)),
    weekStart: setTarget(getStartOfWeek(curDate))
  };
};

const generateDatepicker = (
  onSelect: NotifyDate,
  curDate: CDate,
  setCurDate: NotifyDate,
  minDate: OptCDate,
  maxDate: OptCDate
): Datepicker => ({
  current: generateCurrent(curDate),
  days: generateDays(onSelect, curDate, setCurDate, minDate, maxDate),
  local: generateLocal(curDate),
  updates: generateUpdates(curDate, setCurDate, minDate, maxDate)
});

const useDatepicker = ({ calendarName, date, language = '', maxDate, minDate, onSelect }: Props) => {
  const calendar = Calendars.instance(calendarName, language);
  const [curDate, setCurDate] = useState<CDate>(date || calendar.date());
  const [datepicker, setDatepicker] = useState<Datepicker>(generateDatepicker(onSelect, curDate, setCurDate, minDate, maxDate));

  useEffect(() => {
    const newDate = date || calendar.date();
    if (newDate.calendar() !== curDate.calendar() || newDate.compareTo(curDate) !== 0) {
      setCurDate(newDate);
    }
  }, [calendar, date]);

  useEffect(() => {
    setDatepicker(generateDatepicker(onSelect, curDate, setCurDate, minDate, maxDate));
  }, [curDate, maxDate, minDate, onSelect, setCurDate, setDatepicker]);

  return datepicker;
};

export type { Current, Datepicker, Day, Local, NotifyDate, Updates };
export default useDatepicker;
