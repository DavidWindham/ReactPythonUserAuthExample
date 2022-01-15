import {connect} from 'react-redux';
import {loginUser, logoutUser} from '../actions';
import {LoginStatus} from '../actions';
import testComponent from '../components/TestComponent';

const getLoginStatus = (loginStatus, loginSwitch) => {
  switch (loginSwitch) {
    case LoginStatus.LOGGED_IN:
      return 'User is logged in';
    case LoginStatus.LOGGED_OUT:
      return 'User is not logged in';
    default:
      return 'Default';
  }
};

const mapStateToProps = (state) => ({
  login: getLoginStatus(state.loginStatus, state.loginSwitch),
});

const mapDispatchToProps = dispatch({
  toggleLogin: () => dispatch(toggleLogin()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(testComponent);
