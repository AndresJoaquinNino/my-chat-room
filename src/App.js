import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Chat from './pages/Chat'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<h1>Register</h1>} />
                <Route path="/forgotPassword" element={<h1>Forgot Password</h1>} />
                <Route path="/chat" element={
                    <RequireAuth>
                        <Chat/>
                    </RequireAuth>
                } />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;