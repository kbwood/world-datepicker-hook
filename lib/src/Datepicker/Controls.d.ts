import { Datepicker } from '../useDatepicker';
import { Localisation } from './types';
declare type Props = {
    datepicker: Datepicker;
    local: Localisation;
};
declare const Controls: ({ datepicker: { updates }, local }: Props) => JSX.Element;
export type { Props };
export default Controls;
