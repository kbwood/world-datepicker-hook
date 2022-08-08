"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthTable = exports.Datepicker = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Datepicker = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  border: 1px solid ", ";\n  direction: ", ";\n  font-family: ", ";\n  font-size: ", ";\n  width: 18em;\n"])), props => props.theme.color.border, props => props.isRTL ? 'rtl' : 'ltr', props => props.theme.font.family, props => props.theme.font.sizeHeader);

exports.Datepicker = Datepicker;

var MonthTable = _styledComponents.default.table(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border-collapse: collapse;\n  width: 100%;\n"])));

exports.MonthTable = MonthTable;
//# sourceMappingURL=Datepicker.styles.js.map