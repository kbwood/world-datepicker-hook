import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calendars, { CDate } from '@kbwood/world-calendars';
import '@kbwood/world-calendars/lib/Gregorian';
import '@kbwood/world-calendars/lib/l10n/Gregorian-zh-CN';
import useDatepicker, { Day } from '../src/useDatepicker';

type TestProps = {
  date?: CDate,
  language?: string,
  maxDate?: CDate,
  minDate?: CDate,
}

describe('(Hook) useDatepicker', () => {
  const gregorian = Calendars.instance('gregorian');
  const user = userEvent.setup();
  const onSelect = jest.fn();

  const generateWeeks = (days: Day[][]) => (
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

  const TestDatepicker = ({ date, language, maxDate, minDate }: TestProps) => {
    const { current, days, local, updates } =
      useDatepicker({ calendarName: 'Gregorian', date, language, maxDate, minDate, onSelect });
    return (
      <>
        <div>
          <button onClick={updates.prevYear} type="button">
            Prev year
          </button>
          <button onClick={updates.prevMonth} type="button">
            Prev month
          </button>
          <button onClick={updates.prevWeek} type="button">
            Prev week
          </button>
          <button onClick={updates.prevDay} type="button">
            Prev day
          </button>
          <button onClick={updates.weekStart} type="button">
            Start week
          </button>
          <button onClick={updates.today} type="button">
            Today
          </button>
          <button onClick={updates.weekEnd} type="button">
            End week
          </button>
          <button onClick={updates.nextDay} type="button">
            Next day
          </button>
          <button onClick={updates.nextWeek} type="button">
            Next week
          </button>
          <button onClick={updates.nextMonth} type="button">
            Next month
          </button>
          <button onClick={updates.nextYear} type="button">
            Next year
          </button>
        </div>
        <table role="grid">
          <thead>
            <tr key="month">
              <th colSpan={local.dayNames.length}>
                {current.monthName} {current.yearLocal}
              </th>
            </tr>
            <tr key="days">
              {local.dayNamesMin.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          {generateWeeks(days)}
        </table>
      </>
    );
  };

  beforeAll(() => {
    const now = new Date(2022, 7 - 1, 13, 12, 0, 0, 0).getTime();
    jest.spyOn(Date, 'now').mockImplementation(() => now);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Default', () => {
    it('should show the current month', () => {
      render(<TestDatepicker />);

      expect(screen.getByRole('columnheader', { name: 'July 2022' })).toBeInTheDocument();
      expect(screen.getByRole('row', { name: 'Su Mo Tu We Th Fr Sa' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '13' })).toHaveClass('selected');
      expect(screen.getAllByRole('row')[2]).toMatchSnapshot();
    });

    it('should respond to moving to the previous year', async () => {
      render(<TestDatepicker />);
      await user.click(screen.getByRole('button', { name: 'Prev year' }));

      expect(screen.getByRole('columnheader', { name: 'July 2021' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '13' })).toHaveClass('selected');
    });

    it('should respond to moving to the previous month', async () => {
      render(<TestDatepicker />);
      await user.click(screen.getByRole('button', { name: 'Prev month' }));

      expect(screen.getByRole('columnheader', { name: 'June 2022' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '13' })).toHaveClass('selected');
    });

    it('should respond to moving to the previous week', async () => {
      render(<TestDatepicker />);
      await user.click(screen.getByRole('button', { name: 'Prev week' }));

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getAllByRole('cell', { name: '6' })[0]).toHaveClass('selected');
    });

    it('should respond to moving to the previous day', async () => {
      render(<TestDatepicker />);
      await user.click(screen.getByRole('button', { name: 'Prev day' }));

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '12' })).toHaveClass('selected');
    });

    it('should respond to moving to the start of the week', async () => {
      render(<TestDatepicker />);
      await user.click(screen.getByRole('button', { name: 'Start week' }));

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '10' })).toHaveClass('selected');
    });

    it('should respond to moving to today', async () => {
      render(<TestDatepicker date={gregorian.date(2022, 7, 19)} />);

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '19' })).toHaveClass('selected');

      await user.click(screen.getByRole('button', { name: 'Today' }));

      expect(screen.getByRole('cell', { name: '13' })).toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '19' })).not.toHaveClass('selected');
    });

    it('should respond to moving to the end of the week', async () => {
      render(<TestDatepicker />);
      await user.click(screen.getByRole('button', { name: 'End week' }));

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '16' })).toHaveClass('selected');
    });

    it('should respond to moving to the next day', async () => {
      render(<TestDatepicker />);
      await user.click(screen.getByRole('button', { name: 'Next day' }));

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '14' })).toHaveClass('selected');
    });

    it('should respond to moving to the next week', async () => {
      render(<TestDatepicker />);
      await user.click(screen.getByRole('button', { name: 'Next week' }));

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '20' })).toHaveClass('selected');
    });

    it('should respond to moving to the next month', async () => {
      render(<TestDatepicker />);
      await user.click(screen.getByRole('button', { name: 'Next month' }));

      expect(screen.getByRole('columnheader', { name: 'August 2022' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '13' })).toHaveClass('selected');
    });

    it('should respond to moving to the next year', async () => {
      render(<TestDatepicker />);
      await user.click(screen.getByRole('button', { name: 'Next year' }));

      expect(screen.getByRole('columnheader', { name: 'July 2023' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '13' })).toHaveClass('selected');
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

  describe('With min/max date', () => {
    it('should disable dates before the minimum date', () => {
      render(<TestDatepicker minDate={gregorian.date(2022, 7, 12)} />);

      expect(screen.getAllByRole('button', { name: '1' })[0]).toBeDisabled();
      expect(screen.getByRole('button', { name: '11' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '12' })).not.toBeDisabled();
      expect(screen.getAllByRole('button', { name: '30' })[1]).not.toBeDisabled();
    });

    it('should disable dates after the maximum date', () => {
      render(<TestDatepicker maxDate={gregorian.date(2022, 7, 15)} />);

      expect(screen.getAllByRole('button', { name: '1' })[0]).not.toBeDisabled();
      expect(screen.getByRole('button', { name: '15' })).not.toBeDisabled();
      expect(screen.getByRole('button', { name: '16' })).toBeDisabled();
      expect(screen.getAllByRole('button', { name: '30' })[1]).toBeDisabled();
    });

    it('should respond to moving to the previous year when restricted by a minimum date', async () => {
      render(<TestDatepicker minDate={gregorian.date(2022, 3, 17)} />);
      await user.click(screen.getByRole('button', { name: 'Prev year' }));

      expect(screen.getByRole('columnheader', { name: 'March 2022' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '17' })).toHaveClass('selected');
      expect(screen.getByRole('button', { name: '16' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '17' })).not.toBeDisabled();
    });

    it('should respond to moving to the previous month  when restricted by a minimum date', async () => {
      render(<TestDatepicker minDate={gregorian.date(2022, 6, 17)} />);
      await user.click(screen.getByRole('button', { name: 'Prev month' }));

      expect(screen.getByRole('columnheader', { name: 'June 2022' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '17' })).toHaveClass('selected');
      expect(screen.getByRole('button', { name: '16' })).toBeDisabled();
      expect(screen.getByRole('button', { name: '17' })).not.toBeDisabled();
    });

    it('should respond to moving to the previous week when restricted by a minimum date', async () => {
      render(<TestDatepicker minDate={gregorian.date(2022, 7, 8)} />);
      await user.click(screen.getByRole('button', { name: 'Prev week' }));

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '8' })).toHaveClass('selected');
    });

    it('should respond to moving to the previous day when restricted by a minimum date', async () => {
      render(<TestDatepicker minDate={gregorian.date(2022, 7, 13)} />);
      await user.click(screen.getByRole('button', { name: 'Prev day' }));

      expect(screen.getByRole('cell', { name: '13' })).toHaveClass('selected');
    });

    it('should respond to moving to the start of the week when restricted by a minimum date', async () => {
      render(<TestDatepicker minDate={gregorian.date(2022, 7, 12)} />);
      await user.click(screen.getByRole('button', { name: 'Start week' }));

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '12' })).toHaveClass('selected');
    });

    it('should respond to moving to the end of the week when restricted by a maximum date', async () => {
      render(<TestDatepicker maxDate={gregorian.date(2022, 7, 14)} />);
      await user.click(screen.getByRole('button', { name: 'End week' }));

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '14' })).toHaveClass('selected');
    });

    it('should respond to moving to the next day when restricted by a maximum date', async () => {
      render(<TestDatepicker maxDate={gregorian.date(2022, 7, 13)} />);
      await user.click(screen.getByRole('button', { name: 'Next day' }));

      expect(screen.getByRole('cell', { name: '13' })).toHaveClass('selected');
    });

    it('should respond to moving to the next week when restricted by a maximum date', async () => {
      render(<TestDatepicker maxDate={gregorian.date(2022, 7, 18)} />);
      await user.click(screen.getByRole('button', { name: 'Next week' }));

      expect(screen.getByRole('cell', { name: '13' })).not.toHaveClass('selected');
      expect(screen.getByRole('cell', { name: '18' })).toHaveClass('selected');
    });

    it('should respond to moving to the next month when restricted by a maximum date', async () => {
      render(<TestDatepicker maxDate={gregorian.date(2022, 8, 7)} />);
      await user.click(screen.getByRole('button', { name: 'Next month' }));

      expect(screen.getByRole('columnheader', { name: 'August 2022' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '7' })).toHaveClass('selected');
    });

    it('should respond to moving to the next year when restricted by a maximum date', async () => {
      render(<TestDatepicker maxDate={gregorian.date(2023, 3, 17)} />);
      await user.click(screen.getByRole('button', { name: 'Next year' }));

      expect(screen.getByRole('columnheader', { name: 'March 2023' })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: '17' })).toHaveClass('selected');
    });
  });

  describe('Localised', () => {
    it('should show the current month', () => {
      render(<TestDatepicker language="zh-CN" />);

      expect(screen.getByRole('columnheader', { name: '七月 二千二十二' })).toBeInTheDocument();
      expect(screen.getByRole('row', { name: '一 二 三 四 五 六 日' })).toBeInTheDocument();
      expect(screen.getAllByRole('row')[2]).toMatchSnapshot();
    });
  });
});
