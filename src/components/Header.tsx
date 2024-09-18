import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa"
import todolist from "../assets/todolist.png"
import { useAuth } from "../contexts/AuthContext"
import toast from "react-hot-toast"

const Header = () => {
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success("logout successful")
    navigate("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src={todolist} alt="TodoList" className="h-8 w-auto sm:h-10" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              TodoList
            </span>
          </Link>
          <div className="hidden sm:flex items-center">
            <Link to="/" className="text-gray-600 hover:text-gray-900 mr-4">
              Home
            </Link>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center bg-slate-600 hover:bg-slate-700 text-white px-3 py-2 rounded transition duration-300"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            )}
          </div>
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Home
            </Link>
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout()
                  toggleMenu()
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                <FaSignOutAlt className="inline mr-2" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header