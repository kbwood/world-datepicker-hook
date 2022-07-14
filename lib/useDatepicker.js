"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _worldCalendars = _interopRequireDefault(require("@kbwood/world-calendars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateDays = (onSelect, curDate, setCurDate) => {
  var calendar = curDate.calendar();

  var localiseDigits = calendar.local.localiseDigits || (value => value);

  var today = calendar.date();
  var daysInWeek = calendar.daysInWeek();
  var monthFirst = curDate.set(calendar.minDay, 'd');
  var monthCalc = monthFirst.sub(monthFirst.dayOfWeek(), 'd').add(calendar.local.firstDay, 'd');
  var monthStart = monthCalc.month() === curDate.month() && monthCalc.day() > calendar.minDay ? monthCalc.sub(1, 'w') : monthCalc;
  var monthLast = monthFirst.add(1, 'm').sub(1, 'd');
  var weekCount = Math.ceil((monthLast.toJD() - monthStart.toJD() + 1) / daysInWeek);
  var monthEnd = monthStart.add(weekCount, 'w').sub(1, 'd');
  var days = [];
  var forDay = monthStart;

  var _loop = function _loop() {
    var thisDay = forDay.date();
    var day = {
      date: thisDay,
      isDisabled: false,
      isInCurrentMonth: thisDay.month() === curDate.month(),
      isSelected: thisDay.compareTo(curDate) === 0,
      isToday: thisDay.compareTo(today) === 0,
      isWeekend: !thisDay.weekDay(),
      label: "".concat(localiseDigits(String(thisDay.day()))),
      onClick: () => {
        setCurDate(thisDay);
        onSelect(thisDay);
      }
    };
    days.push(day);
    forDay = forDay.add(1, 'd');
  };

  while (forDay.compareTo(monthEnd) <= 0) {
    _loop();
  }

  return days;
};

var generateUpdates = (curDate, setCurDate) => {
  return {
    nextDay: () => {
      setCurDate(curDate.add(1, 'd'));
    },
    nextMonth: () => {
      setCurDate(curDate.add(1, 'm'));
    },
    nextWeek: () => {
      setCurDate(curDate.add(1, 'w'));
    },
    nextYear: () => {
      setCurDate(curDate.add(1, 'y'));
    },
    prevDay: () => {
      setCurDate(curDate.sub(1, 'd'));
    },
    prevMonth: () => {
      setCurDate(curDate.sub(1, 'm'));
    },
    prevWeek: () => {
      setCurDate(curDate.sub(1, 'w'));
    },
    prevYear: () => {
      setCurDate(curDate.sub(1, 'y'));
    },
    weekEnd: () => {
      setCurDate(curDate.add(1, 'd'));
    },
    weekStart: () => {
      setCurDate(curDate.sub(1, 'd'));
    }
  };
};

var generateDatepicker = (onSelect, curDate, setCurDate) => {
  var calendar = curDate.calendar();
  return {
    calendarDays: generateDays(onSelect, curDate, setCurDate),
    isRTL: calendar.local.isRTL,
    month: {
      name: calendar.local.monthNames[curDate.month() - calendar.firstMonth],
      num: curDate.month()
    },
    updates: generateUpdates(curDate, setCurDate),
    weekDays: calendar.local.dayNamesMin,
    year: curDate.year()
  };
};

var useDatepicker = function useDatepicker(onSelect, calendarName) {
  var language = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var date = arguments.length > 3 ? arguments[3] : undefined;

  var calendar = _worldCalendars.default.instance(calendarName, language);

  var [curDate, setCurDate] = (0, _react.useState)(date || calendar.date());
  var [datepicker, setDatepicker] = (0, _react.useState)(generateDatepicker(onSelect, curDate, setCurDate));
  (0, _react.useEffect)(() => {
    var newDate = date || calendar.date();

    if (newDate.calendar() !== curDate.calendar() || newDate.compareTo(curDate) !== 0) {
      setCurDate(newDate);
    }
  }, [calendar, date]);
  (0, _react.useEffect)(() => {
    setDatepicker(generateDatepicker(onSelect, curDate, setCurDate));
  }, [curDate, onSelect, setCurDate, setDatepicker]);
  return datepicker;
};

var _default = useDatepicker;
exports.default = _default;
//# sourceMappingURL=useDatepicker.js.map