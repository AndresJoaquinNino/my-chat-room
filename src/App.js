import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
      <AuthProvider>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <RequireAuth needAuth={true} alternative={<Landing/>}>
                        <Home/>
                    </RequireAuth>
                } />
                <Route path="/login" element={
                    <RequireAuth needAuth={false} alternative="/">
                        <SignIn />
                    </RequireAuth>
                } />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;