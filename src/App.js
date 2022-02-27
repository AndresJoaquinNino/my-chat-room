import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chat from './pages/Chat'
import SignIn from './pages/SignIn'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <RequireAuth needAuth={true} alternative='/login'>
                        <Chat/>
                    </RequireAuth>
                } />
                <Route path="/login" element={
                    <RequireAuth needAuth={false} alternative="/">
                        <SignIn/>
                    </RequireAuth>
                } />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;