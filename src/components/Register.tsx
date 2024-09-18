import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import toast from "react-hot-toast"

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await register(username, password)
      toast.success("Registration successful! Please log in.")
      navigate("/login")
    } catch (err) {
      toast.error("Registration failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="px-8 py-10 mt-4 text-left bg-gray-800 rounded-lg shadow-custom"
        style={{ width: "400px" }}
      >
        <h3 className="text-2xl font-bold text-center text-white">
          Create an account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block text-gray-300" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 bg-gray-700 text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-300">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 bg-gray-700 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-purple-600 rounded-lg hover:bg-purple-800">
                Register
              </button>
            </div>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <p className="mt-4 text-sm text-center text-gray-300">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="ml-1 text-purple-400 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register