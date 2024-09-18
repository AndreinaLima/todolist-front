import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { FaPlus, FaEdit, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa"
import todolist from "../assets/todolist.png"

interface Todo {
  id: number
  title: string
  description: string
  isCompleted: boolean
}

const API_URL = import.meta.env.VITE_API_URL + "/todos"

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({ title: "", description: "" })
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const { isAuthenticated, token, logout } = useAuth()
  const navigate = useNavigate()

  const fetchTodos = useCallback(async () => {
    if (!token) return

    try {
      const response = await axios.get<Todo[]>(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTodos(response.data)
    } catch (error) {
      console.error("Error fetching todos:", error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout()
        navigate("/login")
      } else {
        toast.error("Error fetching todos. Please try again.")
      }
    }
  }, [token, logout, navigate])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    fetchTodos()
  }, [isAuthenticated, navigate, fetchTodos])

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.title.trim()) return
    try {
      const response = await axios.post<Todo>(
        API_URL,
        { ...newTodo, isCompleted: false },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTodos([...todos, response.data])
      setNewTodo({ title: "", description: "" })
      toast.success("Todo added successfully!")
    } catch (error) {
      console.error("Error adding todo:", error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout()
        navigate("/login")
      } else {
        toast.error("Error adding todo. Please try again.")
      }
    }
  }

  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      const response = await axios.patch<Todo>(`${API_URL}/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...response.data } : todo
        )
      )
      setEditingTodo(null)
      toast.success("Todo updated successfully!")
    } catch (error) {
      console.error("Error updating todo:", error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout()
        navigate("/login")
      } else {
        toast.error("Error updating todo. Please try again.")
      }
    }
  }

  const handleEdit = (todo: Todo) => {
    setEditingTodo({ ...todo })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingTodo) {
      await updateTodo(editingTodo.id, {
        title: editingTodo.title,
        description: editingTodo.description,
      })
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTodos(todos.filter((todo) => todo.id !== id))
      toast.success("Todo deleted successfully!")
    } catch (error) {
      console.error("Error deleting todo:", error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout()
        navigate("/login")
      } else {
        toast.error("Error deleting todo. Please try again.")
      }
    }
  }

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-4">
      <div className="container max-w-4xl w-full bg-white rounded-lg shadow-lg mt-4 sm:mt-8">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src={todolist}
              alt="Todo List"
              className="w-10 h-10 sm:w-12 sm:h-12 mr-3"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-purple-700">
              Todo List
            </h1>
          </div>
        </div>
        <div className="p-4">
          <form
            onSubmit={addTodo}
            className="mb-6 flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              className="border border-purple-400 p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo({ ...newTodo, title: e.target.value })
              }
              placeholder="Todo title"
            />
            <input
              type="text"
              className="border border-purple-400 p-2 flex-1 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
              placeholder="Todo description"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white p-2 rounded w-full sm:w-auto"
            >
              <FaPlus className="inline mr-1" /> Add Todo
            </button>
          </form>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="p-2 border border-gray-300 flex flex-col sm:flex-row items-center justify-between bg-white rounded-lg shadow-sm"
              >
                {editingTodo?.id === todo.id ? (
                  <form
                    onSubmit={handleUpdate}
                    className="flex flex-col sm:flex-row gap-2 w-full"
                  >
                    <input
                      type="text"
                      className="border border-purple-400 p-2 flex-1 rounded-md"
                      value={editingTodo.title}
                      onChange={(e) =>
                        setEditingTodo({
                          ...editingTodo,
                          title: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      className="border border-purple-400 p-2 flex-1 rounded-md"
                      value={editingTodo.description}
                      onChange={(e) =>
                        setEditingTodo({
                          ...editingTodo,
                          description: e.target.value,
                        })
                      }
                    />
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      <button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded"
                      >
                        <FaCheck />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTodo(null)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex-1 mb-2 sm:mb-0">
                      <strong className="text-gray-800">{todo.title}</strong> -{" "}
                      {todo.description}
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center sm:justify-end">
                      <button
                        onClick={() =>
                          updateTodo(todo.id, {
                            isCompleted: !todo.isCompleted,
                          })
                        }
                        className={`${
                          todo.isCompleted ? "bg-green-500" : "bg-yellow-500"
                        } text-white p-1 rounded`}
                      >
                        {todo.isCompleted ? "Mark Undone" : "Mark Done"}
                      </button>
                      <button
                        onClick={() => handleEdit(todo)}
                        className="bg-purple-600 text-white p-1 rounded"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TodoList