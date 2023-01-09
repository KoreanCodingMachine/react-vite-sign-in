import { Routes, Route } from 'react-router'
import SignIn from './SignIn'
import SignUp from './SignUp'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  )
}

export default AppRoutes
