import { Datepicker, DisplayOptions } from '../useDatepicker';
import { Localisation } from './types';
declare type Props = {
    datepicker: Datepicker;
    local: Localisation;
    options: DisplayOptions;
};
declare const Header: ({ datepicker, local, options }: Props) => JSX.Element;
export type { Props };
export default Header;
