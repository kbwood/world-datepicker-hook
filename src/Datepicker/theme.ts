type Theme = {
  color: {
    border: string,
    controlsBG: string,
    controlsFG: string,
    dayBG: string,
    dayBorder: string,
    dayFG: string,
    monthBG: string,
    monthFG: string,
    otherMonthBG: string,
    otherMonthFG: string,
    selectedBG: string,
    selectedFG: string,
    todayBG: string,
    todayFG: string,
    unselectableFG: string,
    weekBG: string,
    weekFG: string,
    weekendBG: string,
    weekendFG: string,
  },
  font: {
    family: string,
  selectedWeight: string,
    sizeBody: string,
    sizeHeader: string,
  }
}

const defaultTheme: Theme = {
  color: {
    border: '#444',
    controlsBG: '#000',
    controlsFG: '#fff',
    dayBG: '#eee',
    dayBorder: '#aaa',
    dayFG: '#000',
    monthBG: '#444',
    monthFG: '#fff',
    otherMonthBG: '#fff',
    otherMonthFG: '#000',
    selectedBG: '#777',
    selectedFG: '#fff',
    todayBG: '#f0a0a0',
    todayFG: '#000',
    unselectableFG: '#888',
    weekBG: '#777',
    weekFG: '#fff',
    weekendBG: '#ddd',
    weekendFG: '#000'
  },
  font: {
    family: 'Arial,Helvetica,sans-serif',
    selectedWeight: 'bold',
    sizeBody: '20px',
    sizeHeader: '24px'
  }
};

export type { Theme };
export default defaultTheme;
