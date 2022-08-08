"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controls = exports.Button = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Controls = _styledComponents.default.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n  background-color: ", ";\n  font-weight: bold;\n"])), props => props.theme.color.controlsBG);

exports.Controls = Controls;

var Button = _styledComponents.default.button(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  background-color: transparent;\n  border: 0;\n  color: ", ";\n  cursor: pointer;\n  font-family: ", ";\n  font-size: ", ";\n  font-weight: bold;\n  padding: 0.5em;\n"])), props => props.theme.color.controlsFG, props => props.theme.font.family, props => props.theme.font.sizeHeader);

exports.Button = Button;
//# sourceMappingURL=Controls.styles.js.map