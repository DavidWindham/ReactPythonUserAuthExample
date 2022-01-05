import './App.css';

import RegisterForm from './components/register_form';
import LoginForm from './components/login_form';
import ProtectedButton from './components/query_protected';


function App() {
  return (
    <div className="App">
      <RegisterForm />
      <LoginForm />
      <ProtectedButton />
    </div>
  );
}

export default App;
