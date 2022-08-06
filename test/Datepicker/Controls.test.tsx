import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Controls from '../../src/Datepicker/Controls';
import { localisations } from '../../src/Datepicker/Datepicker';
import '../../src/Datepicker/l10n/Datepicker-fr';
import { mockDatepicker } from './TestData';

describe('(Component) Datepicker Controls', () => {
  const user = userEvent.setup();

  it('should render the datepicker controls', () => {
    const { container } = render(
      <Controls datepicker={mockDatepicker} local={localisations['']} />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="controls"
        >
          <button
            aria-label="Show the previous year"
            type="button"
          >
            &lt;&lt;
          </button>
          <button
            aria-label="Show the previous month"
            type="button"
          >
            &lt;
          </button>
          <button
            aria-label="Show today's month"
            type="button"
          >
            Today
          </button>
          <button
            aria-label="Show the next month"
            type="button"
          >
            &gt;
          </button>
          <button
            aria-label="Show the next year"
            type="button"
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    `);
  });

  it('should move to the previous year when selected', async () => {
    render(<Controls datepicker={mockDatepicker} local={localisations['']} />);
    await user.click(
      screen.getByRole('button', { name: 'Show the previous year' })
    );

    expect(mockDatepicker.updates.prevYear).toHaveBeenCalledTimes(1);
  });

  it('should move to the previous month when selected', async () => {
    render(<Controls datepicker={mockDatepicker} local={localisations['']} />);
    await user.click(
      screen.getByRole('button', { name: 'Show the previous month' })
    );

    expect(mockDatepicker.updates.prevMonth).toHaveBeenCalledTimes(1);
  });

  it('should move to today when selected', async () => {
    render(<Controls datepicker={mockDatepicker} local={localisations['']} />);
    await user.click(
      screen.getByRole('button', { name: 'Show today\'s month' })
    );

    expect(mockDatepicker.updates.today).toHaveBeenCalledTimes(1);
  });

  it('should move to the next month when selected', async () => {
    render(<Controls datepicker={mockDatepicker} local={localisations['']} />);
    await user.click(
      screen.getByRole('button', { name: 'Show the next month' })
    );

    expect(mockDatepicker.updates.nextMonth).toHaveBeenCalledTimes(1);
  });

  it('should move to the next year when selected', async () => {
    render(<Controls datepicker={mockDatepicker} local={localisations['']} />);
    await user.click(
      screen.getByRole('button', { name: 'Show the next year' })
    );

    expect(mockDatepicker.updates.nextYear).toHaveBeenCalledTimes(1);
  });

  it('should render the datepicker controls with localisation', async () => {
    render(<Controls datepicker={mockDatepicker} local={localisations.fr} />);

    expect(screen.getByLabelText('Voir l\'année précédent')).toBeInTheDocument();
    expect(screen.getByLabelText('Voir le mois précédent')).toBeInTheDocument();
    expect(screen.getByLabelText('Voir aujourd\'hui')).toBeInTheDocument();
    expect(screen.getByLabelText('Voir le mois suivant')).toBeInTheDocument();
    expect(screen.getByLabelText('Voir l\'année suivant')).toBeInTheDocument();
  });
});
