import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import TodoList from "./components/TodoList"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./contexts/AuthContext"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/todos"
              element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/todos" replace />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </AuthProvider>
  )
}

export default App