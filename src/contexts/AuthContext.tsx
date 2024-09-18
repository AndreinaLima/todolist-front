import React, { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

interface AuthContextType {
  isAuthenticated: boolean
  currentUser: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  register: (username: string, password: string) => Promise<void>
  token: string | null
  loading: boolean
  userId: number | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  )
  const [loading, setLoading] = useState<boolean>(true)

  const checkAuthStatus = async () => {
    setLoading(true)
    const storedToken = localStorage.getItem("token")
    const storedUsername = localStorage.getItem("username")
    const storedUserId = localStorage.getItem("userId")
    if (storedToken && storedUsername && storedUserId) {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/validate",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        if (response.status === 200) {
          console.log("Token is valid")
          setIsAuthenticated(true)
          setCurrentUser(storedUsername)
          setUserId(parseInt(storedUserId, 10))
          setToken(storedToken)
        } else {
          throw new Error("Invalid token")
        }
      } catch (error) {
        console.log("Token is invalid")
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userId")
        setIsAuthenticated(false)
        setCurrentUser(null)
        setUserId(null)
        setToken(null)
      }
    } else {
      setIsAuthenticated(false)
      setCurrentUser(null)
      setUserId(null)
      setToken(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const register = async (username: string, password: string) => {
    try {
      await axios.post("http://localhost:3000/users/register", {
        username,
        password,
      })
    } catch (error) {
      throw new Error("Error registering user")
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      })
      const { access_token, username: loggedInUsername, userId } = response.data
      localStorage.setItem("token", access_token)
      localStorage.setItem("username", loggedInUsername)
      localStorage.setItem("userId", userId.toString())
      setToken(access_token)
      setCurrentUser(loggedInUsername)
      setUserId(userId)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Login failed:", error)
      throw new Error("Login failed")
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("userId")
    setIsAuthenticated(false)
    setCurrentUser(null)
    setUserId(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        userId,
        login,
        logout,
        register,
        token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}