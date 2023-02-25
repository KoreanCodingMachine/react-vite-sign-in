import { useEffect } from 'react'
import { useProductContext } from '../../contexts/ProductsContext'

const Carts = () => {
  const { carts, getsCart, removeToCart, subToCart, addToCart } =
    useProductContext()

  useEffect(() => {
    getsCart()
  }, [])

  return (
    <div>
      {carts.map(prd => {
        return (
          <div
            key={prd.id}
            style={{ borderBottom: '1px solid #cdcdcd', padding: '1rem' }}
          >
            <div>
              {prd.id} / {prd.name}
            </div>
            <div>Count: {prd.count}</div>
            <div>
              <button onClick={() => addToCart(prd.id!)}>Increase</button>
              <button onClick={() => subToCart(prd.id!)}>Decrease</button>
            </div>
            <div>
              <button onClick={() => removeToCart(prd.id!)}>Remove</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Carts
