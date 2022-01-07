import './App.css';

import RegisterForm from './components/register_form';
import LoginForm from './components/login_form';
import ProtectedButton from './components/query_protected';
import Logout from './components/logout';

function App() {
  return (
    <div className="App">
      <RegisterForm />
      <LoginForm />
      <ProtectedButton />
      <Logout />
    </div>
  );
}

export default App;
