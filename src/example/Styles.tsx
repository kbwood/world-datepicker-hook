import React from 'react';

const Styles = () => {
  const styles = `
    .datepicker { font-size: 24px; width: 18em; }
    .datepicker.ltr { direction: ltr; }
    .datepicker.rtl { direction: rtl; }
    .datepicker button { background-color: transparent; border: 0; cursor: pointer; font-size: 90%; padding: 0.5em; }
    .datepicker button[disabled] { color: #888; }
    .datepicker table { width: 100%; }
    .datepicker table button { width: 100%; }
    .datepicker td { text-align: center; }
    .datepicker .controls { display: flex; justify-content: space-between; }
    .datepicker .weekend { background-color: #ccc; }
    .datepicker .today { background-color: #f00; }
    .datepicker .today button { color: #fff; }
    .datepicker .selected { background-color: #00f; }
    .datepicker .selected button { color: #fff; }
  `;
  return <style>{styles}</style>;
};

export default Styles;
