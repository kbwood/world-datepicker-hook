import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calendars from '@kbwood/world-calendars';
import '@kbwood/world-calendars/lib/Gregorian';
import useDatepicker, { Datepicker } from '../src/useDatepicker';

describe('(Hook) useDatepicker', () => {
  const gregorian = Calendars.instance('gregorian');
  const user = userEvent.setup();
  const onSelect = jest.fn();

  const generateWeeks = ({ calendarDays, weekDays }: Datepicker) => {
    const daysInWeek = weekDays.length;
    const countWeeks = calendarDays.length / daysInWeek;
    const weeks = [];
    for (let w = 0; w < countWeeks; w += 1) {
      const week = calendarDays.slice(w * daysInWeek, (w + 1) * daysInWeek);
      weeks.push(
        <tr key={`w${week[0].date.toString()}`}>
          {weekDays.map((_, d) => {
            const {
              date,
              isDisabled,
              isInCurrentMonth,
              isSelected,
              isToday,
              isWeekend,
              label,
              onClick
            } = week[d];
            const className = `${isInCurrentMonth ? '' : 'other'} ${
              isSelected ? 'selected' : ''
            } ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}`;
            return (
              <td key={date.toString()} className={className}>
                <button disabled={isDisabled} onClick={onClick} type="button">
                  {label}
                </button>
              </td>
            );
          })}
        </tr>
      );
    }
    return weeks;
  };

  const TestDatepicker = () => {
    const datepicker = useDatepicker(onSelect, 'Gregorian', '');
    return (
      <>
        <div>
          <button onClick={datepicker.updates.prevYear} type="button">
            &lt;&lt;
          </button>
          <button onClick={datepicker.updates.prevMonth} type="button">
            &lt;
          </button>
          <button onClick={datepicker.updates.nextMonth} type="button">
            &gt;
          </button>
          <button onClick={datepicker.updates.nextYear} type="button">
            &gt;&gt;
          </button>
        </div>
        <table role="grid">
          <thead>
            <tr key="month">
              <th colSpan={datepicker.weekDays.length}>
                {datepicker.month.name} {datepicker.year}
              </th>
            </tr>
            <tr key="days">
              {datepicker.weekDays.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>{generateWeeks(datepicker)}</tbody>
        </table>
      </>
    );
  };

  beforeAll(() => {
    const now = new Date(2022, 7 - 1, 1, 12, 0, 0, 0).getTime();
    jest.spyOn(Date, 'now').mockImplementation(() => now);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show the current month', () => {
    expect(render(<TestDatepicker />).container).toMatchSnapshot();
  });

  it('should respond to moving to the previous year', async () => {
    render(<TestDatepicker />);
    await user.click(screen.getByRole('button', { name: '<<' }));

    expect(screen.getByRole('columnheader', { name: 'July 2021' })).toBeInTheDocument();
  });

  it('should respond to moving to the previous month', async () => {
    render(<TestDatepicker />);
    await user.click(screen.getByRole('button', { name: '<' }));

    expect(screen.getByRole('columnheader', { name: 'June 2022' })).toBeInTheDocument();
  });

  it('should respond to moving to the next month', async () => {
    render(<TestDatepicker />);
    await user.click(screen.getByRole('button', { name: '>' }));

    expect(screen.getByRole('columnheader', { name: 'August 2022' })).toBeInTheDocument();
  });

  it('should respond to moving to the next year', async () => {
    render(<TestDatepicker />);
    await user.click(screen.getByRole('button', { name: '>>' }));

    expect(screen.getByRole('columnheader', { name: 'July 2023' })).toBeInTheDocument();
  });

  it('should respond to selecting a date', async () => {
    render(<TestDatepicker />);
    await user.click(screen.getByRole('button', { name: '19' }));

    expect(screen.getByRole('columnheader', { name: 'July 2022' })).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '1' })[0]).not.toHaveClass('selected');
    expect(screen.getByRole('cell', { name: '19' })).toHaveClass('selected');
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(gregorian.date(2022, 7, 19));
  });

  it('should respond to selecting a date in another month', async () => {
    render(<TestDatepicker />);
    await user.click(screen.getAllByRole('button', { name: '29' })[0]);

    expect(screen.getByRole('columnheader', { name: 'June 2022' })).toBeInTheDocument();
    expect(screen.getAllByRole('cell', { name: '29' })[0]).not.toHaveClass('selected');
    expect(screen.getAllByRole('cell', { name: '1' })[0]).not.toHaveClass('selected');
    expect(screen.getAllByRole('cell', { name: '29' })[1]).toHaveClass('selected');
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(gregorian.date(2022, 6, 29));
  });
});
