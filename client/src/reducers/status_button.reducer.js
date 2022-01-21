const initialState = {buttonColor: 'grey'};

const buttonStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BUTTON_SET_SUCCESS':
      return {
        ...state,
        buttonColor: 'green',
      };
    case 'BUTTON_SET_FAILURE':
      return {
        ...state,
        buttonColor: 'red',
      };
    case 'BUTTON_SET_NEUTRAL':
      return {
        ...state,
        buttonColor: 'grey',
      };
    default:
      return state;
  }
};

export default buttonStatusReducer;
