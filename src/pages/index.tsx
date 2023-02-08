import { Routes, Route } from 'react-router'
import * as MiniShop from './MiniShop'
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

      <Route path="/mini-shop" element={<MiniShop.Main />}>
        <Route path="" element={<MiniShop.Products />} />
        <Route path="carts" element={<MiniShop.Carts />} />
        <Route path="infinite" element={<MiniShop.ProductsInfinite />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
