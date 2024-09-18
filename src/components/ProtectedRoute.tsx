import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext" // Ajuste o caminho conforme necessário

interface ProtectedRouteProps {
  children: React.ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, token, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    // Você pode renderizar um componente de loading aqui
    return <div>Loading...</div>
  }

  if (!isAuthenticated && !token) {
    // Redireciona para a página de login se não estiver autenticado
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute