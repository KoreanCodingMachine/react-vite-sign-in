import { Routes, Route } from 'react-router'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Todo from './Todo'
import TodoDetail from './TodoDetail'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/todo/:id" element={<TodoDetail />} />
    </Routes>
  )
}

export default AppRoutes
