import { CDate } from '@kbwood/world-calendars';
import { DisplayOptions } from '../useDatepicker';
import { Theme } from './theme';
import { Localisation } from './types';
declare type Props = {
    calendarName: string;
    date?: CDate;
    language?: string;
    maxDate?: CDate;
    minDate?: CDate;
    onSelect: (date: CDate) => void;
    options?: DisplayOptions;
    theme?: Theme;
};
declare type LocalisationsMap = {
    [index: string]: Localisation;
};
declare const localisations: LocalisationsMap;
declare const Datepicker: ({ calendarName, date, language, maxDate, minDate, onSelect, options, theme }: Props) => JSX.Element;
export type { Props };
export { localisations };
export default Datepicker;
