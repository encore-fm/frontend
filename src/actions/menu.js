import ReactGA from "react-ga";

export const SET_MENU_OPEN = 'SET_MENU_OPEN';
export const SET_MENU_CLOSED = 'SET_MENU_CLOSED';

export const openMenu = () => {
  ReactGA.event({
    category: 'Menu',
    action: 'open'
  });

  return {
    type: SET_MENU_OPEN,
  }
};

export const closeMenu = () => {
  ReactGA.event({
    category: 'Menu',
    action: 'close'
  });

  return {
    type: SET_MENU_CLOSED
  }
};
