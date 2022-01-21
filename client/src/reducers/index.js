import {combineReducers} from 'redux';
import userReducer from './user.reducer';
import newUserReducer from './new_user.reducer';
import buttonStatusReducer from './status_button.reducer';


export default combineReducers({
  userReducer,
  newUserReducer,
  buttonStatusReducer,
});
