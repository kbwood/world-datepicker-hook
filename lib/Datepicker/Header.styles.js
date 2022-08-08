"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekHeader = exports.TableHeader = exports.Select = exports.MonthHeader = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Select = _styledComponents.default.select(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border: 0;\n  color: ", ";\n  font-family: ", ";\n  font-size: ", ";\n  font-weight: bold;\n"])), props => props.theme.color.monthBG, props => props.theme.color.monthFG, props => props.theme.font.family, props => props.theme.font.sizeHeader);

exports.Select = Select;

var TableHeader = _styledComponents.default.thead(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  th {\n    padding: 0.5em;\n  }\n"])));

exports.TableHeader = TableHeader;

var MonthHeader = _styledComponents.default.tr(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border: 1px solid ", ";\n  color: ", ";\n"])), props => props.theme.color.monthBG, props => props.theme.color.monthBG, props => props.theme.color.monthFG);

exports.MonthHeader = MonthHeader;

var WeekHeader = _styledComponents.default.tr(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border: 1px solid ", ";\n  color: ", ";\n"])), props => props.theme.color.weekBG, props => props.theme.color.weekBG, props => props.theme.color.weekFG);

exports.WeekHeader = WeekHeader;
//# sourceMappingURL=Header.styles.js.map