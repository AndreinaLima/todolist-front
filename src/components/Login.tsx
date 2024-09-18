import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import toast from "react-hot-toast"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  useEffect(() => {
    if (location.state && (location.state as any).message) {
      toast.success((location.state as any).message)
    }
  }, [location])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await login(username, password)
      toast.success("Login successful!")
      navigate("/todos")
    } catch (err) {
      toast.error("Invalid credentials")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="px-8 py-10 mt-4 text-left bg-white rounded-lg shadow-custom"
        style={{ width: "400px" }}
      >
        <h3 className="text-2xl font-bold text-center text-purple-700">
          Login to your account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block text-gray-800" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-800">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-purple-600 rounded-lg hover:bg-purple-800">
                Login
              </button>
            </div>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <p className="mt-4 text-sm text-center">
          Don't have an account?
          <button
            onClick={() => navigate("/register")}
            className="ml-1 text-purple-600 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login