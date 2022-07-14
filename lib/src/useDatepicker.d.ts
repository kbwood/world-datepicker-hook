import { MouseEventHandler } from 'react';
import { CDate } from '@kbwood/world-calendars';
declare type NotifyDate = (date: CDate) => void;
declare type CalendarDay = {
    date: CDate;
    isDisabled: boolean;
    isInCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
    isWeekend: boolean;
    label: string;
    onClick: MouseEventHandler;
};
declare type DatepickerUpdates = {
    nextDay: MouseEventHandler;
    nextMonth: MouseEventHandler;
    nextWeek: MouseEventHandler;
    nextYear: MouseEventHandler;
    prevDay: MouseEventHandler;
    prevMonth: MouseEventHandler;
    prevWeek: MouseEventHandler;
    prevYear: MouseEventHandler;
    weekEnd: MouseEventHandler;
    weekStart: MouseEventHandler;
};
declare type MonthData = {
    name: string;
    num: number;
};
declare type Datepicker = {
    calendarDays: CalendarDay[];
    isRTL: boolean;
    month: MonthData;
    updates: DatepickerUpdates;
    weekDays: string[];
    year: number;
};
declare const useDatepicker: (onSelect: NotifyDate, calendarName: string, language?: string, date?: CDate) => Datepicker;
export type { CalendarDay, Datepicker, DatepickerUpdates, MonthData, NotifyDate };
export default useDatepicker;
