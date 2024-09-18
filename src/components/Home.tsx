import { Link } from "react-router-dom"
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"
import todolist from "../assets/todolist.png"

const Home = () => {
  return (
    <div className="mt-20 flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <img
            src={todolist}
            alt="TodoList"
            className="mx-auto h-24 w-auto mb-4"
          />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Bem-vindo ao TodoList
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Organize suas tarefas de forma simples e eficiente
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <Link
              to="/login"
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaSignInAlt className="mr-2" />
              Entrar
            </Link>
            <Link
              to="/register"
              className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaUserPlus className="mr-2" />
              Registrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home