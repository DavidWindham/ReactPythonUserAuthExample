import React from 'react';
import {CSSTransition} from 'react-transition-group';

export const SlideFromRight = (props) => (
  <CSSTransition
    {...props}
    classNames="slide-right"
    timeout={{enter: 500, exit: 300}}
  />
);
