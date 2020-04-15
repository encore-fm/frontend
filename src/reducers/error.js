const initialState = {
  error: null,
  description: null
};

export default (state = initialState, action) => {
  const { error } = action;
  if (error)
    return {...error};
  return state;
};
