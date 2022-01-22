import React from 'react';
import {CSSTransition} from 'react-transition-group';

export const SlideFromLeft = (props) => (
  <CSSTransition
    {...props}
    classNames="slide-left"
    timeout={{enter: 500, exit: 300}}
  />
);
