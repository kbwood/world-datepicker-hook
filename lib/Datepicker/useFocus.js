"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var useFocus = ref => {
  var [hasFocus, setHasFocus] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    var gainsFocus = () => {
      setHasFocus(true);
    };

    var losesFocus = () => {
      setHasFocus(false);
    };

    var elem = ref.current;

    if (elem) {
      elem.addEventListener('focusin', gainsFocus);
      elem.addEventListener('focusout', losesFocus);
    }

    return () => {
      if (elem) {
        elem.removeEventListener('focusin', gainsFocus);
        elem.removeEventListener('focusout', losesFocus);
      }
    };
  }, [setHasFocus, ref]);
  return hasFocus;
};

var _default = useFocus;
exports.default = _default;
//# sourceMappingURL=useFocus.js.map