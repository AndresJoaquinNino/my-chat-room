import './App.css';
import { AuthProvider } from './context/AuthContext'
import SignIn from './pages/SignIn'

function App() {
  return (
      <AuthProvider>
          <SignIn/>
      </AuthProvider>
  );
}

export default App;