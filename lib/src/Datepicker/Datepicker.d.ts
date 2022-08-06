/// <reference types="react" />
import { CDate } from '@kbwood/world-calendars';
import { DisplayOptions } from '../useDatepicker';
import { Localisation } from './types';
declare type Props = {
    calendarName: string;
    date?: CDate;
    language?: string;
    maxDate?: CDate;
    minDate?: CDate;
    onSelect: (date: CDate) => void;
    options?: DisplayOptions;
};
declare type LocalisationsMap = {
    [index: string]: Localisation;
};
declare const localisations: LocalisationsMap;
declare const Datepicker: ({ calendarName, date, language, maxDate, minDate, onSelect, options }: Props) => JSX.Element;
export { localisations };
export type { Props };
export default Datepicker;
