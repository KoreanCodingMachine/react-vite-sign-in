import { Outlet, Link } from 'react-router-dom'
import { ProductContextProvider } from '../../contexts/ProductsContext'

const Main = () => {
  return (
    <ProductContextProvider>
      <h3
        style={{
          borderBottom: '1px solid #232323',
        }}
      >
        Mini Shop
      </h3>

      <div
        style={{
          borderBottom: '1px solid #232323',
        }}
      >
        <Link to="/mini-shop">go to products</Link>
        <span>|</span>
        <Link to="/mini-shop/carts">go to carts</Link>
      </div>

      <Outlet />
    </ProductContextProvider>
  )
}

export default Main
