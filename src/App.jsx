import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './components/Admin';
import Candidate from './components/Candidate';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/candidate"
            element={
              <ProtectedRoute role="candidate">
                <Candidate />
              </ProtectedRoute>
            }
          />

        
      </Routes>
    </Router >
    </>
  )
}

export default App
