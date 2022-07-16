import React from 'react';
import { Datepicker } from '../useDatepicker';

type Props = {
  datepicker: Datepicker
}

const MonthBody = ({ datepicker: { days } }: Props) => (
  <tbody>
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
            onClick
          } = day;
          const className = `${isInCurrentMonth ? '' : 'other'} ${
            isSelected ? 'selected' : ''
          } ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}`;
          return (
            <td key={date.toString()} className={className}>
              <button disabled={isDisabled} onClick={onClick} tabIndex={isSelected ? 0 : -1} type="button">
                {label}
              </button>
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
);

export default MonthBody;
