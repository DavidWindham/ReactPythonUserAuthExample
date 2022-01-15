import {combineReducers} from 'redux';
import userReducer from './user.reducer';
import newUserReducer from './new_user.reducer';

export default combineReducers({
  userReducer,
  newUserReducer,
});
