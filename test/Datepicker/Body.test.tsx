import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Body from '../../src/Datepicker/Body';
import { mockDatepicker } from './TestData';

describe('(Component) Datepicker Body', () => {
  const user = userEvent.setup();
  let table: HTMLTableElement;

  beforeEach(() => {
    table = document.createElement('table');
    document.body.appendChild(table);
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(table);
  });

  it('should render a month body', () => {
    render(<Body datepicker={mockDatepicker} />, { container: table });

    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByRole('row', { name: '26 27 28 29 30 1 2' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: '3 4 5 6 7 8 9' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: '10 11 12 13 14 15 16' })).toBeInTheDocument();
  });

  it('should render days with classes', () => {
    render(<Body datepicker={mockDatepicker} />, { container: table });
    const cells = screen.getAllByRole('cell');

    expect(cells).toHaveLength(21);
    const classes = ['other weekend', 'other', 'other', 'other', 'other', '', 'weekend',
      'selected weekend', '', '', '', '', '', 'weekend',
      'weekend', 'today', '', '', '', '', 'weekend'];
    cells.forEach((cell, i) => {
      expect((cell.getAttribute('class') || '').replace(/\s+/g, ' ').trim()).toBe(classes[i]);
    });
  });

  it('should disable days from other months', () => {
    render(<Body datepicker={mockDatepicker} />, { container: table });
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(21);
    buttons.forEach((button, i) => {
      expect((button as HTMLButtonElement).disabled).toBe(i <= 4);
    });
  });

  it('should only have one tab target', () => {
    const { container } = render(<Body datepicker={mockDatepicker} />, { container: table });

    expect(container.querySelectorAll('button[tabIndex="0"]')).toHaveLength(1);
  });

  it('should respond to selection of a date', async () => {
    render(<Body datepicker={mockDatepicker} />, { container: table });
    await user.click(screen.getByRole('button', { name: '5' }));

    expect(mockDatepicker.days[1][2].selectDay).toHaveBeenCalledTimes(1);
  });

  it('should respond to keyboard entries', async () => {
    const { container } = render(<Body datepicker={mockDatepicker} />, { container: table });
    act(() => {
      const button = container.querySelector('button[tabIndex="0"]');
      if (button) {
        (button as HTMLButtonElement).focus();
      }
    });

    await user.keyboard('{ArrowDown}');
    expect(mockDatepicker.updates.nextWeek).toHaveBeenCalledTimes(1);

    await user.keyboard('{ArrowLeft}');
    expect(mockDatepicker.updates.prevDay).toHaveBeenCalledTimes(1);

    await user.keyboard('{ArrowRight}');
    expect(mockDatepicker.updates.nextDay).toHaveBeenCalledTimes(1);

    await user.keyboard('{ArrowUp}');
    expect(mockDatepicker.updates.prevWeek).toHaveBeenCalledTimes(1);

    await user.keyboard('{End}');
    expect(mockDatepicker.updates.weekEnd).toHaveBeenCalledTimes(1);

    await user.keyboard('{Home}');
    expect(mockDatepicker.updates.weekStart).toHaveBeenCalledTimes(1);

    await user.keyboard('{PageDown}');
    expect(mockDatepicker.updates.nextMonth).toHaveBeenCalledTimes(1);

    await user.keyboard('{Shift>}{PageDown}{/Shift}');
    expect(mockDatepicker.updates.nextYear).toHaveBeenCalledTimes(1);

    await user.keyboard('{PageUp}');
    expect(mockDatepicker.updates.prevMonth).toHaveBeenCalledTimes(1);

    await user.keyboard('{Shift>}{PageUp}{/Shift}');
    expect(mockDatepicker.updates.prevYear).toHaveBeenCalledTimes(1);
  });
});
