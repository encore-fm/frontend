export const SET_MENU_OPEN = 'SET_MENU_OPEN';
export const SET_MENU_CLOSED = 'SET_MENU_CLOSED';

export const openMenu = () => ({
  type: SET_MENU_OPEN,
});

export const closeMenu = () => ({
  type: SET_MENU_CLOSED,
});
