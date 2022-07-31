import Calendars from '@kbwood/world-calendars';
import '@kbwood/world-calendars/lib/Gregorian';
import { Datepicker } from '../../src/useDatepicker';

const gregorian = Calendars.instance('gregorian');

const makeDay = (month: number, day: number, weekend?: boolean) => ({
  date: gregorian.date(2022, month, day),
  isDisabled: month !== 7,
  isInCurrentMonth: month === 7,
  isSelected: day === 3,
  isToday: day === 11,
  isWeekend: !!weekend,
  label: `${day}`,
  selectDay: jest.fn()
});

export const mockDatepicker: Datepicker = {
  current: {
    date: gregorian.date(2022, 7, 3),
    month: 7,
    monthName: 'July',
    monthNameShort: 'Jul',
    year: 2022,
    yearLocal: '2022'
  },
  days: [
    [makeDay(6, 26, true), makeDay(6, 27), makeDay(6, 28), makeDay(6, 29), makeDay(6, 30),
      makeDay(7, 1), makeDay(7, 2, true)],
    [makeDay(7, 3, true), makeDay(7, 4), makeDay(7, 5), makeDay(7, 6),
      makeDay(7, 7), makeDay(7, 8), makeDay(7, 9, true)],
    [makeDay(7, 10, true), makeDay(7, 11), makeDay(7, 12), makeDay(7, 13),
      makeDay(7, 14), makeDay(7, 15), makeDay(7, 16, true)]
  ],
  local: {
    days: gregorian.local.dayNames.map((name, i) => ({
      name,
      nameMin: gregorian.local.dayNamesMin[i],
      nameShort: gregorian.local.dayNamesShort[i]
    })),
    isRTL: gregorian.local.isRTL,
    months: gregorian.local.monthNames.map((name, i) => ({
      disabled: false,
      name,
      nameShort: gregorian.local.monthNamesShort[i],
      value: i + 1
    })),
    years: [2020, 2021, 2022, 2023, 2024, 2025].map(year => ({
      name: `${year}`,
      value: year
    }))
  },
  updates: {
    nextDay: jest.fn(),
    nextMonth: jest.fn(),
    nextWeek: jest.fn(),
    nextYear: jest.fn(),
    prevDay: jest.fn(),
    prevMonth: jest.fn(),
    prevWeek: jest.fn(),
    prevYear: jest.fn(),
    setMonth: jest.fn(),
    setYear: jest.fn(),
    today: jest.fn(),
    weekEnd: jest.fn(),
    weekStart: jest.fn()
  }
};
