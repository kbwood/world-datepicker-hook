import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { localisations } from '../../src/Datepicker/Datepicker';
import Header from '../../src/Datepicker/Header';
import defaultTheme from '../../src/Datepicker/theme';
import '../../src/Datepicker/l10n/Datepicker-fr';
import { mockDatepicker } from './TestData';

describe('(Component) Datepicker Header', () => {
  const user = userEvent.setup();
  let table: HTMLTableElement;
  const renderHeader = (options = {}, local = localisations['']) =>
    render(
      <ThemeProvider theme={defaultTheme}>
        <Header datepicker={mockDatepicker} local={local} options={options} />
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

  it('should render a month header', () => {
    const { container } = renderHeader();

    expect(container).toMatchInlineSnapshot(`
      <table>
        <thead
          class="sc-ftvSup cPdYDC"
        >
          <tr
            class="sc-papXJ gPjacy"
          >
            <th
              colspan="7"
            >
              July
               
              2022
            </th>
          </tr>
          <tr
            class="sc-jqUVSM cuPygD"
          >
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
    renderHeader({ selectMonth: true });
    const select = screen.getByRole('combobox', { name: 'Change the month' });

    expect(select).toBeInTheDocument();

    await user.selectOptions(select, 'February');

    expect(mockDatepicker.updates.setMonth).toHaveBeenCalledTimes(1);
    expect(mockDatepicker.updates.setMonth).toHaveBeenCalledWith('2');
  });

  it('should render a month header with selectable years', async () => {
    renderHeader({ selectYear: true, yearRange: '2015:2025' });
    const select = screen.getByRole('combobox', { name: 'Change the year' });

    expect(select).toBeInTheDocument();

    await user.selectOptions(select, '2020');

    expect(mockDatepicker.updates.setYear).toHaveBeenCalledTimes(1);
    expect(mockDatepicker.updates.setYear).toHaveBeenCalledWith('2020');
  });

  it('should render a month header with localisation', async () => {
    renderHeader(
      { selectMonth: true, selectYear: true, yearRange: '2015:2025' },
      localisations.fr
    );

    expect(
      screen.getByRole('combobox', { name: 'Voir un autre mois' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', { name: 'Voir une autre année' })
    ).toBeInTheDocument();
  });
});
