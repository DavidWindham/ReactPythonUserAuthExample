const newUserReducer = (state = 'LOGIN', action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return state = 'LOGIN';
    case 'SET_REGISTER':
      return state = 'REGISTER';
    default:
      return state;
  }
};

export default newUserReducer;
