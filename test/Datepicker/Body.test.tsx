import React from 'react';
import { ThemeProvider } from 'styled-components';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Body from '../../src/Datepicker/Body';
import defaultTheme from '../../src/Datepicker/theme';
import { mockDatepicker } from './TestData';

describe('(Component) Datepicker Body', () => {
  const user = userEvent.setup();
  let table: HTMLTableElement;
  const renderBody = () =>
    render(
      <ThemeProvider theme={defaultTheme}>
        <Body datepicker={mockDatepicker} />
      </ThemeProvider>,
      { container: table }
    );

  beforeEach(() => {
    table = document.createElement('table');
    document.body.appendChild(table);
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(table);
  });

  it('should render a month body', () => {
    renderBody();

    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(
      screen.getByRole('row', { name: '26 27 28 29 30 1 2' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('row', { name: '3 4 5 6 7 8 9' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('row', { name: '10 11 12 13 14 15 16' })
    ).toBeInTheDocument();
  });

  it('should render days with classes', () => {
    renderBody();

    expect(screen.getByRole('cell', { name: '26' })).toMatchInlineSnapshot(`
      <td
        class="sc-gsnTZi jESjDg"
      >
        <button
          class="sc-dkzDqf iomTHQ"
          disabled=""
          tabindex="-1"
          type="button"
        >
          26
        </button>
      </td>
    `);
    expect(screen.getByRole('cell', { name: '27' })).toMatchInlineSnapshot(`
      <td
        class="sc-gsnTZi hrptdS"
      >
        <button
          class="sc-dkzDqf iomTHQ"
          disabled=""
          tabindex="-1"
          type="button"
        >
          27
        </button>
      </td>
    `);
    expect(screen.getByRole('cell', { name: '1' })).toMatchInlineSnapshot(`
      <td
        class="sc-gsnTZi fWUjA-d"
      >
        <button
          class="sc-dkzDqf iomTHQ"
          tabindex="-1"
          type="button"
        >
          1
        </button>
      </td>
    `);
    expect(screen.getByRole('cell', { name: '2' })).toMatchInlineSnapshot(`
      <td
        class="sc-gsnTZi jESjDg"
      >
        <button
          class="sc-dkzDqf iomTHQ"
          tabindex="-1"
          type="button"
        >
          2
        </button>
      </td>
    `);
    expect(screen.getByRole('cell', { name: '3' })).toMatchInlineSnapshot(`
      <td
        class="sc-gsnTZi cbYRnl"
      >
        <button
          class="sc-dkzDqf iomTHQ"
          tabindex="0"
          type="button"
        >
          3
        </button>
      </td>
    `);
    expect(screen.getByRole('cell', { name: '11' })).toMatchInlineSnapshot(`
      <td
        class="sc-gsnTZi jnGANC"
      >
        <button
          class="sc-dkzDqf iomTHQ"
          tabindex="-1"
          type="button"
        >
          11
        </button>
      </td>
    `);
  });

  it('should disable days from other months', () => {
    renderBody();
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(21);
    buttons.forEach((button, i) => {
      expect((button as HTMLButtonElement).disabled).toBe(i <= 4);
    });
  });

  it('should only have one tab target', () => {
    const { container } = renderBody();

    expect(container.querySelectorAll('button[tabIndex="0"]')).toHaveLength(1);
  });

  it('should respond to selection of a date', async () => {
    renderBody();
    await user.click(screen.getByRole('button', { name: '5' }));

    expect(mockDatepicker.days[1][2].selectDay).toHaveBeenCalledTimes(1);
  });

  it('should respond to keyboard entries', async () => {
    const { container } = renderBody();
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
