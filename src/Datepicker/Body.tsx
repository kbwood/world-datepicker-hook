import React, { useEffect, useRef } from 'react';
import { Datepicker } from '../useDatepicker';
import useFocus from './useFocus';

type Props = {
  datepicker: Datepicker,
}

const Body = ({ datepicker: { days, local, updates } }: Props) => {
  const tableRef = useRef<HTMLTableSectionElement>(null);
  const hasFocus = useFocus(tableRef);

  useEffect(() => {
    const handleKeystrokes = (event: KeyboardEvent) => {
      switch (event.code) {
      case 'ArrowDown':
        updates.nextWeek();
        break;
      case 'ArrowLeft':
        local.isRTL ? updates.nextDay() : updates.prevDay();
        break;
      case 'ArrowRight':
        local.isRTL ? updates.prevDay() : updates.nextDay();
        break;
      case 'ArrowUp':
        updates.prevWeek();
        break;
      case 'End':
        updates.weekEnd();
        break;
      case 'Home':
        updates.weekStart();
        break;
      case 'PageDown':
        event.shiftKey ? updates.nextYear() : updates.nextMonth();
        break;
      case 'PageUp':
        event.shiftKey ? updates.prevYear() : updates.prevMonth();
        break;
      default: // Do nothing
      }
    };
    const table = tableRef.current;
    if (table) {
      table.addEventListener('keydown', handleKeystrokes);
      if (hasFocus) {
        const curButton = table.querySelector('button[tabindex="0"]') as HTMLElement;
        if (curButton) {
          curButton.focus();
        }
      }
    }

    return () => {
      if (table) {
        table.removeEventListener('keydown', handleKeystrokes);
      }
    };
  }, [hasFocus, local, tableRef.current, updates]);

  return (
    <tbody ref={tableRef}>
      {days.map(week => (
        <tr key={`w${week[0].date.toString()}`}>
          {week.map(day => {
            const {
              date,
              isDisabled,
              isInCurrentMonth,
              isSelected,
              isToday,
              isWeekend,
              label,
              selectDay
            } = day;
            const className = `${isInCurrentMonth ? '' : 'other'} ${
              isSelected ? 'selected' : ''
            } ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}`;
            return (
              <td key={date.toString()} className={className}>
                <button
                  disabled={isDisabled}
                  onClick={() => { selectDay(); }}
                  tabIndex={isSelected ? 0 : -1}
                  type="button"
                >
                  {label}
                </button>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export type { Props };
export default Body;
