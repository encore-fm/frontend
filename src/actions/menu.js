export const SET_MENU_OPEN = 'SET_MENU_OPEN';
export const SET_MENU_CLOSED = 'SET_MENU_CLOSED';

export const openMenu = () => {
  return {
    type: SET_MENU_OPEN,
  }
};

export const closeMenu = () => {
  return {
    type: SET_MENU_CLOSED
  }
};
