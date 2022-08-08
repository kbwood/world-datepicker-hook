declare type Theme = {
    color: {
        border: string;
        controlsBG: string;
        controlsFG: string;
        dayBG: string;
        dayBorder: string;
        dayFG: string;
        monthBG: string;
        monthFG: string;
        otherMonthBG: string;
        otherMonthFG: string;
        selectedBG: string;
        selectedFG: string;
        todayBG: string;
        todayFG: string;
        unselectableFG: string;
        weekBG: string;
        weekFG: string;
        weekendBG: string;
        weekendFG: string;
    };
    font: {
        family: string;
        selectedWeight: string;
        sizeBody: string;
        sizeHeader: string;
    };
};
declare const defaultTheme: Theme;
export type { Theme };
export default defaultTheme;
