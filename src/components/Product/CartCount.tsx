import { useProductContext } from '../../contexts/ProductsContext'

export default function CartCount() {
  const { carts } = useProductContext()

  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '9999px',
        border: '1px solid #ffffff',
        background: '#232323',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '14px',
      }}
    >
      {Object.keys(carts).length}
    </div>
  )
}
