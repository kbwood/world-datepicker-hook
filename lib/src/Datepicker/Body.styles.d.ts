/// <reference types="react" />
declare type DayProps = {
    inCurrentMonth?: boolean;
    selected?: boolean;
    today?: boolean;
    weekend?: boolean;
};
export declare const TableBody: import("styled-components").StyledComponent<"tbody", any, {}, never>;
export declare const DayCell: import("styled-components").StyledComponent<"td", any, DayProps, never>;
export declare const DayButton: import("styled-components").StyledComponent<"button", any, {
    onclick: import("react").MouseEventHandler<HTMLButtonElement> | undefined;
}, "onclick">;
export {};
