import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { localisations } from '../../src/Datepicker/Datepicker';
import Header from '../../src/Datepicker/Header';
import '../../src/Datepicker/l10n/Datepicker-fr';
import { mockDatepicker } from './TestData';

describe('(Component) Datepicker Header', () => {
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

  it('should render a month header', () => {
    const { container } = render(<Header datepicker={mockDatepicker} local={localisations['']} options={{}} />, { container: table });

    expect(container).toMatchInlineSnapshot(`
      <table>
        <thead>
          <tr>
            <th
              colspan="7"
            >
              July
               
              2022
            </th>
          </tr>
          <tr>
            <th>
              <abbr
                title="Sunday"
              >
                Su
              </abbr>
            </th>
            <th>
              <abbr
                title="Monday"
              >
                Mo
              </abbr>
            </th>
            <th>
              <abbr
                title="Tuesday"
              >
                Tu
              </abbr>
            </th>
            <th>
              <abbr
                title="Wednesday"
              >
                We
              </abbr>
            </th>
            <th>
              <abbr
                title="Thursday"
              >
                Th
              </abbr>
            </th>
            <th>
              <abbr
                title="Friday"
              >
                Fr
              </abbr>
            </th>
            <th>
              <abbr
                title="Saturday"
              >
                Sa
              </abbr>
            </th>
          </tr>
        </thead>
      </table>
    `);
  });

  it('should render a month header with selectable months', async () => {
    render(
      <Header datepicker={mockDatepicker} local={localisations['']} options={{ selectMonth: true }} />,
      { container: table }
    );
    const select = screen.getByRole('combobox', { name: 'Change the month' });

    expect(select).toBeInTheDocument();

    await user.selectOptions(select, 'February');

    expect(mockDatepicker.updates.setMonth).toHaveBeenCalledTimes(1);
    expect(mockDatepicker.updates.setMonth).toHaveBeenCalledWith('2');
  });

  it('should render a month header with selectable years', async () => {
    render(
      <Header
        datepicker={mockDatepicker}
        local={localisations['']}
        options={{ selectYear: true, yearRange: '2015:2025' }}
      />,
      { container: table }
    );
    const select = screen.getByRole('combobox', { name: 'Change the year' });

    expect(select).toBeInTheDocument();

    await user.selectOptions(select, '2020');

    expect(mockDatepicker.updates.setYear).toHaveBeenCalledTimes(1);
    expect(mockDatepicker.updates.setYear).toHaveBeenCalledWith('2020');
  });

  it('should render a month header with localisation', async () => {
    render(
      <Header
        datepicker={mockDatepicker}
        local={localisations.fr}
        options={{ selectMonth: true, selectYear: true, yearRange: '2015:2025' }}
      />,
      { container: table }
    );
    expect(screen.getByRole('combobox', { name: 'Voir un autre mois' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Voir une autre année' })).toBeInTheDocument();
  });
});
