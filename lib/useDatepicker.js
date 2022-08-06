"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _worldCalendars = _interopRequireDefault(require("@kbwood/world-calendars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateCurrent = curDate => {
  var calendar = curDate.calendar();
  var yearString = "".concat(curDate.year());
  return {
    date: curDate,
    month: curDate.month(),
    monthName: calendar.local.monthNames[curDate.month() - calendar.firstMonth],
    monthNameShort: calendar.local.monthNamesShort[curDate.month() - calendar.firstMonth],
    year: curDate.year(),
    yearLocal: calendar.local.localiseDigits ? calendar.local.localiseDigits(yearString) : yearString
  };
};

var generateDays = (onSelect, curDate, setCurDate, minDate, maxDate, _ref) => {
  var {
    selectDaysInOtherMonths,
    showDaysInOtherMonths
  } = _ref;
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
  var week = 0;

  var _loop = function _loop() {
    var thisDay = forDay.date();
    var isInCurrentMonth = thisDay.month() === curDate.month();
    var isDisabled = !!minDate && thisDay.compareTo(minDate) === -1 || !!maxDate && thisDay.compareTo(maxDate) === 1 || !(selectDaysInOtherMonths || isInCurrentMonth);
    var day = {
      date: thisDay,
      isDisabled,
      isInCurrentMonth,
      isSelected: thisDay.compareTo(curDate) === 0,
      isToday: thisDay.compareTo(today) === 0,
      isWeekend: !thisDay.weekDay(),
      label: showDaysInOtherMonths || isInCurrentMonth ? "".concat(localiseDigits(String(thisDay.day()))) : '',
      selectDay: () => {
        setCurDate(thisDay);
        onSelect(thisDay);
      }
    };

    if (!days[week]) {
      days[week] = [];
    }

    days[week].push(day);
    forDay = forDay.add(1, 'd');

    if (forDay.dayOfWeek() === calendar.local.firstDay) {
      week += 1;
    }
  };

  while (forDay.compareTo(monthEnd) <= 0) {
    _loop();
  }

  return days;
};

var generateYears = (curDate, minDate, maxDate, options) => {
  var years = [];

  if (!options.selectYear) {
    return years;
  }

  var yearLimits = (options.yearRange || '').split(':').map(value => parseInt(value, 10));

  if (yearLimits.length !== 2 || yearLimits.some(value => isNaN(value))) {
    return years;
  }

  yearLimits[0] = minDate ? Math.max(minDate.year(), yearLimits[0]) : yearLimits[0];
  yearLimits[1] = maxDate ? Math.min(maxDate.year(), yearLimits[1]) : yearLimits[1];
  var calendar = curDate.calendar();

  var localiseDigits = calendar.local.localiseDigits || (value => value);

  for (var y = yearLimits[0]; y <= yearLimits[1]; y += 1) {
    years.push({
      name: localiseDigits("".concat(y)),
      value: y
    });
  }

  return years;
};

var generateLocal = (curDate, minDate, maxDate, options) => {
  var calendar = curDate.calendar();
  var daysInWeek = calendar.daysInWeek();
  var year = curDate.year();
  var {
    dayNames,
    dayNamesMin,
    dayNamesShort,
    firstDay,
    isRTL,
    monthNames,
    monthNamesShort
  } = calendar.local;

  var isDisabled = m => !!maxDate && calendar.date(year, m, calendar.minDay).compareTo(maxDate) > 0 || !!minDate && calendar.date(year, m, calendar.daysInMonth(year, m)).compareTo(minDate) < 0;

  return {
    days: dayNames.map((_, i) => {
      var index = (i + firstDay) % daysInWeek;
      return {
        name: dayNames[index],
        nameMin: dayNamesMin[index],
        nameShort: dayNamesShort[index]
      };
    }),
    isRTL,
    months: monthNames.map((name, i) => ({
      disabled: isDisabled(i + calendar.firstMonth),
      name,
      nameShort: monthNamesShort[i],
      value: i + calendar.firstMonth
    })),
    years: generateYears(curDate, minDate, maxDate, options)
  };
};

var getStartOfWeek = date => {
  var firstDay = date.calendar().local.firstDay;
  var dow = date.dayOfWeek();
  return date.sub(dow < firstDay ? date.calendar().daysInWeek() : dow, 'd').add(firstDay, 'd');
};

var getEndOfWeek = date => getStartOfWeek(date).add(date.calendar().daysInWeek() - 1, 'd');

var max = function max(d1) {
  var d2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : d1;
  return d1.compareTo(d2) === 1 ? d1 : d2;
};

var min = function min(d1) {
  var d2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : d1;
  return d1.compareTo(d2) === -1 ? d1 : d2;
};

var generateUpdates = (curDate, setCurDate, minDate, maxDate) => {
  var setTarget = target => () => {
    setCurDate(max(min(target, maxDate), minDate));
  };

  return {
    nextDay: setTarget(curDate.add(1, 'd')),
    nextMonth: setTarget(curDate.add(1, 'm')),
    nextWeek: setTarget(curDate.add(1, 'w')),
    nextYear: setTarget(curDate.add(1, 'y')),
    prevDay: setTarget(curDate.sub(1, 'd')),
    prevMonth: setTarget(curDate.sub(1, 'm')),
    prevWeek: setTarget(curDate.sub(1, 'w')),
    prevYear: setTarget(curDate.sub(1, 'y')),
    setMonth: month => {
      setTarget(curDate.set(parseInt("".concat(month), 10), 'm'))();
    },
    setYear: year => {
      setTarget(curDate.set(parseInt("".concat(year), 10), 'y'))();
    },
    today: setTarget(curDate.calendar().date()),
    weekEnd: setTarget(getEndOfWeek(curDate)),
    weekStart: setTarget(getStartOfWeek(curDate))
  };
};

var generateDatepicker = (onSelect, curDate, setCurDate, minDate, maxDate, options) => ({
  current: generateCurrent(curDate),
  days: generateDays(onSelect, curDate, setCurDate, minDate, maxDate, options),
  local: generateLocal(curDate, minDate, maxDate, options),
  updates: generateUpdates(curDate, setCurDate, minDate, maxDate)
});

var noOptions = {};

var useDatepicker = _ref2 => {
  var {
    calendarName,
    date,
    language = '',
    maxDate,
    minDate,
    onSelect,
    options = noOptions
  } = _ref2;

  var calendar = _worldCalendars.default.instance(calendarName, language);

  var [curDate, setCurDate] = (0, _react.useState)(date || calendar.date());
  var [datepicker, setDatepicker] = (0, _react.useState)(generateDatepicker(onSelect, curDate, setCurDate, minDate, maxDate, options));
  (0, _react.useEffect)(() => {
    var newDate = date || calendar.date();

    if (newDate.calendar() !== curDate.calendar() || newDate.compareTo(curDate) !== 0) {
      setCurDate(newDate);
    }
  }, [calendar, date]);
  (0, _react.useEffect)(() => {
    setDatepicker(generateDatepicker(onSelect, curDate, setCurDate, minDate, maxDate, options));
  }, [curDate, maxDate, minDate, onSelect, options, setCurDate, setDatepicker]);
  return datepicker;
};

var _default = useDatepicker;
exports.default = _default;
//# sourceMappingURL=useDatepicker.js.map