import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Controls from '../../src/Datepicker/Controls';
import { mockDatepicker } from './TestData';

describe('(Component) Datepicker Controls', () => {
  const user = userEvent.setup();

  it('should render the datepicker controls', () => {
    const { container } = render(<Controls datepicker={mockDatepicker} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="controls"
        >
          <button
            type="button"
          >
            &lt;&lt;
          </button>
          <button
            type="button"
          >
            &lt;
          </button>
          <button
            type="button"
          >
            Today
          </button>
          <button
            type="button"
          >
            &gt;
          </button>
          <button
            type="button"
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    `);
  });

  it('should move to the previous year when selected', async () => {
    render(<Controls datepicker={mockDatepicker} />);
    await user.click(screen.getByRole('button', { name: '<<' }));

    expect(mockDatepicker.updates.prevYear).toHaveBeenCalledTimes(1);
  });

  it('should move to the previous month when selected', async () => {
    render(<Controls datepicker={mockDatepicker} />);
    await user.click(screen.getByRole('button', { name: '<' }));

    expect(mockDatepicker.updates.prevMonth).toHaveBeenCalledTimes(1);
  });

  it('should move to today when selected', async () => {
    render(<Controls datepicker={mockDatepicker} />);
    await user.click(screen.getByRole('button', { name: 'Today' }));

    expect(mockDatepicker.updates.today).toHaveBeenCalledTimes(1);
  });

  it('should move to the next month when selected', async () => {
    render(<Controls datepicker={mockDatepicker} />);
    await user.click(screen.getByRole('button', { name: '>' }));

    expect(mockDatepicker.updates.nextMonth).toHaveBeenCalledTimes(1);
  });

  it('should move to the next year when selected', async () => {
    render(<Controls datepicker={mockDatepicker} />);
    await user.click(screen.getByRole('button', { name: '>>' }));

    expect(mockDatepicker.updates.nextYear).toHaveBeenCalledTimes(1);
  });
});
