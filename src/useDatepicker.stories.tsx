import React, { useCallback } from 'react';
import { CDate } from '@kbwood/world-calendars';
import '@kbwood/world-calendars/lib/Coptic';
import '@kbwood/world-calendars/lib/Discworld';
import '@kbwood/world-calendars/lib/Ethiopian';
import '@kbwood/world-calendars/lib/l10n/Ethiopian-am';
import '@kbwood/world-calendars/lib/Gregorian';
import '@kbwood/world-calendars/lib/l10n/Gregorian-ar';
import '@kbwood/world-calendars/lib/l10n/Gregorian-fr';
import '@kbwood/world-calendars/lib/l10n/Gregorian-zh-CN';
import '@kbwood/world-calendars/lib/Hebrew';
import '@kbwood/world-calendars/lib/l10n/Hebrew-he';
import '@kbwood/world-calendars/lib/Islamic';
import '@kbwood/world-calendars/lib/l10n/Islamic-ar';
import '@kbwood/world-calendars/lib/Julian';
import '@kbwood/world-calendars/lib/l10n/Julian-fr';
import '@kbwood/world-calendars/lib/Mayan';
import '@kbwood/world-calendars/lib/Nanakshahi';
import '@kbwood/world-calendars/lib/l10n/Nanakshahi-pa';
import '@kbwood/world-calendars/lib/Nepali';
import '@kbwood/world-calendars/lib/l10n/Nepali-ne';
import '@kbwood/world-calendars/lib/Persian';
import '@kbwood/world-calendars/lib/l10n/Persian-fa';
import '@kbwood/world-calendars/lib/Taiwan';
import '@kbwood/world-calendars/lib/l10n/Taiwan-zh-TW';
import '@kbwood/world-calendars/lib/Thai';
import '@kbwood/world-calendars/lib/l10n/Thai-th';
import '@kbwood/world-calendars/lib/UmmAlQura';
import '@kbwood/world-calendars/lib/l10n/UmmAlQura-ar';
import ExampleDatepicker from './example/Datepicker';

type Props = {
  calendarName: string
  language: string
}

export default {
  title: 'Datepicker',
  argTypes: {
    calendarName: {
      control: 'select',
      options: ['Coptic', 'Discworld', 'Ethiopian', 'Gregorian', 'Hebrew', 'Islamic', 'Julian', 'Mayan', 'Nanakshahi', 'Nepali', 'Persian', 'Taiwan', 'Thai', 'UmmAlQura']
    },
    language: {
      control: 'select',
      options: ['  (Default)', 'am (Ethiopian)', 'ar (Gregorian, Islamic, Umm al-Qura)', 'fa (Persian)', 'fr (Gregorian, Julian)', 'he (Hebrew)', 'ne (Nepali)', 'pa (Nanakshahi)', 'th (Thai)', 'zh-TW (Taiwan)', 'zh-CN (Gregorian)']
    }
  }
};

const Template = ({ calendarName = 'Gregorian', language = '' }: Props) => {
  const onSelect = useCallback((date: CDate) => {
    alert(`You selected ${date.toString()}`);
  }, []);
  return <ExampleDatepicker calendarName={calendarName} language={language.split(' ')[0]} onSelect={onSelect} />;
};

export const Default = Template.bind({});
