import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

/**
 * Protected route that requires the user to be authenticated
 * AND be a Bizzer employee (is_bizzer_employee = true)
 */
export default function EmployeeProtectedRoute({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login, but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!user?.is_bizzer_employee) {
    // User is authenticated but not a Bizzer employee
    // Redirect to home page
    return <Navigate to="/" replace />
  }

  return children
}
