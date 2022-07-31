import { useEffect, useState } from 'react';
import Calendars, { CDate } from '@kbwood/world-calendars';

type Notify = () => void
type NotifyDate = (date: CDate) => void
type NotifyPeriod = (period: string | number) => void
type Current = {
  date: CDate,
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
  selectDay: Notify,
}
type LocalDay = {
  name: string,
  nameMin: string,
  nameShort: string,
}
type LocalMonth = {
  disabled: boolean,
  name: string,
  nameShort: string,
  value: number,
}
type LocalYear = {
  name: string,
  value: number,
}
type Local = {
  days: LocalDay[],
  isRTL: boolean,
  months: LocalMonth[],
  years: LocalYear[],
}
type Updates = {
  nextDay: Notify,
  nextMonth: Notify,
  nextWeek: Notify,
  nextYear: Notify,
  prevDay: Notify,
  prevMonth: Notify,
  prevWeek: Notify,
  prevYear: Notify,
  setMonth: NotifyPeriod,
  setYear: NotifyPeriod,
  today: Notify,
  weekEnd: Notify,
  weekStart: Notify,
}
type Datepicker = {
  current: Current,
  days: Day[][],
  local: Local,
  updates: Updates,
}

type DisplayOptions = {
  selectDaysInOtherMonths?: boolean,
  selectMonth?: boolean,
  selectYear?: boolean,
  showDaysInOtherMonths?: boolean,
  yearRange?: string,
}
type Props = {
  calendarName: string,
  date?: CDate,
  language?: string,
  maxDate?: CDate,
  minDate?: CDate,
  onSelect: NotifyDate,
  options?: DisplayOptions,
}
type OptCDate = CDate | undefined

const generateCurrent = (curDate: CDate): Current => {
  const calendar = curDate.calendar();
  const yearString = `${curDate.year()}`;
  return {
    date: curDate,
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
  maxDate: OptCDate,
  { selectDaysInOtherMonths, showDaysInOtherMonths }: DisplayOptions
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
    const isInCurrentMonth = thisDay.month() === curDate.month();
    const isDisabled = (!!minDate && thisDay.compareTo(minDate) === -1) ||
      (!!maxDate && thisDay.compareTo(maxDate) === 1) ||
      !(selectDaysInOtherMonths || isInCurrentMonth);
    const day = {
      date: thisDay,
      isDisabled,
      isInCurrentMonth,
      isSelected: thisDay.compareTo(curDate) === 0,
      isToday: thisDay.compareTo(today) === 0,
      isWeekend: !thisDay.weekDay(),
      label: (showDaysInOtherMonths || isInCurrentMonth) ? `${localiseDigits(String(thisDay.day()))}` : '',
      selectDay: () => { setCurDate(thisDay); onSelect(thisDay); }
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

const generateYears = (curDate: CDate, minDate: OptCDate, maxDate: OptCDate, options: DisplayOptions): LocalYear[] => {
  const years: LocalYear[] = [];
  if (!options.selectYear) {
    return years;
  }
  const yearLimits = (options.yearRange || '').split(':').map(value => parseInt(value, 10));
  if (yearLimits.length !== 2 || yearLimits.some(value => isNaN(value))) {
    return years;
  }
  yearLimits[0] = minDate ? Math.max(minDate.year(), yearLimits[0]) : yearLimits[0];
  yearLimits[1] = maxDate ? Math.min(maxDate.year(), yearLimits[1]) : yearLimits[1];
  const calendar = curDate.calendar();
  const localiseDigits = calendar.local.localiseDigits || (value => value);
  for (let y = yearLimits[0]; y <= yearLimits[1]; y += 1) {
    years.push({ name: localiseDigits(`${y}`), value: y });
  }
  return years;
};

const generateLocal = (curDate: CDate, minDate: OptCDate, maxDate: OptCDate, options: DisplayOptions): Local => {
  const calendar = curDate.calendar();
  const daysInWeek = calendar.daysInWeek();
  const year = curDate.year();
  const { dayNames, dayNamesMin, dayNamesShort, firstDay, isRTL, monthNames, monthNamesShort } = calendar.local;
  const isDisabled = (m: number) =>
    (!!maxDate && calendar.date(year, m, calendar.minDay).compareTo(maxDate) > 0) ||
    (!!minDate && calendar.date(year, m, calendar.daysInMonth(year, m)).compareTo(minDate) < 0);
  return {
    days: dayNames.map((_, i) => {
      const index = (i + firstDay) % daysInWeek;
      return {
        name: dayNames[index],
        nameMin: dayNamesMin[index],
        nameShort: dayNamesShort[index]
      };
    }),
    isRTL,
    months: monthNames.map((name, i) => ({
      disabled: isDisabled(i + calendar.firstMonth),
      name,
      nameShort: monthNamesShort[i],
      value: i + calendar.firstMonth
    })),
    years: generateYears(curDate, minDate, maxDate, options)
  };
};

const getStartOfWeek = (date: CDate): CDate => {
  const firstDay = date.calendar().local.firstDay;
  const dow = date.dayOfWeek();
  return date.sub(dow < firstDay ? date.calendar().daysInWeek() : dow, 'd').add(firstDay, 'd');
};

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
    setMonth: (month: string | number) => { setTarget(curDate.set(parseInt(`${month}`, 10), 'm'))(); },
    setYear: (year: string | number) => { setTarget(curDate.set(parseInt(`${year}`, 10), 'y'))(); },
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
  maxDate: OptCDate,
  options: DisplayOptions
): Datepicker => ({
  current: generateCurrent(curDate),
  days: generateDays(onSelect, curDate, setCurDate, minDate, maxDate, options),
  local: generateLocal(curDate, minDate, maxDate, options),
  updates: generateUpdates(curDate, setCurDate, minDate, maxDate)
});

const noOptions: DisplayOptions = {};

const useDatepicker = ({
  calendarName,
  date,
  language = '',
  maxDate,
  minDate,
  onSelect,
  options = noOptions
}: Props) => {
  const calendar = Calendars.instance(calendarName, language);
  const [curDate, setCurDate] = useState<CDate>(date || calendar.date());
  const [datepicker, setDatepicker] = useState<Datepicker>(
    generateDatepicker(onSelect, curDate, setCurDate, minDate, maxDate, options)
  );

  useEffect(() => {
    const newDate = date || calendar.date();
    if (newDate.calendar() !== curDate.calendar() || newDate.compareTo(curDate) !== 0) {
      setCurDate(newDate);
    }
  }, [calendar, date]);

  useEffect(() => {
    setDatepicker(generateDatepicker(onSelect, curDate, setCurDate, minDate, maxDate, options));
  }, [curDate, maxDate, minDate, onSelect, options, setCurDate, setDatepicker]);

  return datepicker;
};

export type {
  Current,
  Datepicker,
  Day,
  DisplayOptions,
  Local,
  LocalDay,
  LocalMonth,
  LocalYear,
  Notify,
  NotifyDate,
  NotifyPeriod,
  Updates
};
export default useDatepicker;
