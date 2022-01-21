export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const setLogin = () => ({
  type: 'SET_LOGIN',
});

export const setRegister = () => ({
  type: 'SET_REGISTER',
});

// Functions for protected button state
export const buttonSetSuccess = () => ({
  type: 'BUTTON_SET_SUCCESS',
});

export const buttonSetFailure = () => ({
  type: 'BUTTON_SET_FAILURE',
});

export const buttonSetNeutral = () => ({
  type: 'BUTTON_SET_NEUTRAL',
});
