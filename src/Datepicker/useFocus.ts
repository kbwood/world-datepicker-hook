import { RefObject, useEffect, useState } from 'react';

const useFocus = (ref: RefObject<HTMLElement>) => {
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    const gainsFocus = () => {
      setHasFocus(true);
    };
    const losesFocus = () => {
      setHasFocus(false);
    };
    const elem = ref.current;
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

export default useFocus;
