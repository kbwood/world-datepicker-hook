import { CDate } from '@kbwood/world-calendars';
declare type Notify = () => void;
declare type NotifyDate = (date: CDate) => void;
declare type NotifyPeriod = (period: string | number) => void;
declare type Current = {
    date: CDate;
    month: number;
    monthName: string;
    monthNameShort: string;
    year: number;
    yearLocal: string;
};
declare type Day = {
    date: CDate;
    isDisabled: boolean;
    isInCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
    isWeekend: boolean;
    label: string;
    selectDay: Notify;
};
declare type LocalDay = {
    name: string;
    nameMin: string;
    nameShort: string;
};
declare type LocalMonth = {
    disabled: boolean;
    name: string;
    nameShort: string;
    value: number;
};
declare type LocalYear = {
    name: string;
    value: number;
};
declare type Local = {
    days: LocalDay[];
    isRTL: boolean;
    months: LocalMonth[];
    years: LocalYear[];
};
declare type Updates = {
    nextDay: Notify;
    nextMonth: Notify;
    nextWeek: Notify;
    nextYear: Notify;
    prevDay: Notify;
    prevMonth: Notify;
    prevWeek: Notify;
    prevYear: Notify;
    setMonth: NotifyPeriod;
    setYear: NotifyPeriod;
    today: Notify;
    weekEnd: Notify;
    weekStart: Notify;
};
declare type Datepicker = {
    current: Current;
    days: Day[][];
    local: Local;
    updates: Updates;
};
declare type DisplayOptions = {
    selectDaysInOtherMonths?: boolean;
    selectMonth?: boolean;
    selectYear?: boolean;
    showDaysInOtherMonths?: boolean;
    yearRange?: string;
};
declare type Props = {
    calendarName: string;
    date?: CDate;
    language?: string;
    maxDate?: CDate;
    minDate?: CDate;
    onSelect: NotifyDate;
    options?: DisplayOptions;
};
declare const useDatepicker: ({ calendarName, date, language, maxDate, minDate, onSelect, options }: Props) => Datepicker;
export type { Current, Datepicker, Day, DisplayOptions, Local, LocalDay, LocalMonth, LocalYear, Notify, NotifyDate, NotifyPeriod, Updates };
export default useDatepicker;
