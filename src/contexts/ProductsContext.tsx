import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { IProduct } from '../types'
import generateMockProducts from './products-mock'
import generateMockCart from './cart-mock'

type ICart = Partial<IProduct> & { count: number }
type ProductId = IProduct['id']

const mockProducts = generateMockProducts()
const mockCart = generateMockCart()

interface IProductQuery {
  keyword: string
  page: number
  pageSize: number
}

interface IProductLoading {
  gets: boolean
  get: boolean
  addToCart: boolean
  removeToCart: boolean
  subToCart: boolean
}

interface IProductContext {
  // state
  products: IProduct[]
  carts: ICart[]
  totalPage: number
  query: IProductQuery
  loading: IProductLoading

  // actions (request server)
  gets(): Promise<boolean>
  get(id: ProductId): Promise<{ data: IProduct | undefined }>
  addToCart(id: ProductId): Promise<boolean>
  subToCart(id: ProductId): Promise<boolean>
  removeToCart(id: ProductId): Promise<boolean>
  getsCart(): Promise<ICart[]>

  setQuery(query: Partial<IProductQuery>): void
}

const useDefaultProductContext = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [carts, setCarts] = useState<ICart[]>([])
  const [totalPage, setTotalPage] = useState(0)
  const [query, _setQuery] = useState<IProductQuery>({
    keyword: '',
    page: 0,
    pageSize: 20,
  })
  const [loading, _setLoading] = useState<IProductLoading>({
    gets: false,
    get: false,
    addToCart: false,
    removeToCart: false,
    subToCart: false,
  })

  const gets = async () => {
    if (query.page < 1) return Promise.resolve(false)

    setLoading({ gets: true })

    try {
      const res = await mockProducts.gets(
        query.page,
        query.pageSize,
        query.keyword
      )
      setProducts(res.data)
      setTotalPage(+res.headers['total-page'])
      return true
    } finally {
      setLoading({ gets: false })
    }
  }

  const get = (id: ProductId) => mockProducts.get(id)

  const addToCart = async (id: ProductId) => {
    setLoading({ addToCart: true })
    let result = false

    try {
      result = (await mockCart.add(id)).data
    } catch (error) {
      console.warn(error)
    } finally {
      setLoading({ addToCart: false })

      getsCart().then(res => setCarts(res))
    }

    return result
  }
  const subToCart = async (id: ProductId) => {
    setLoading({ subToCart: true })
    let result = false

    try {
      result = (await mockCart.sub(id)).data
    } catch (error) {
      console.warn(error)
    } finally {
      setLoading({ addToCart: false })

      getsCart().then(res => setCarts(res))
    }

    return result
  }
  const removeToCart = async (id: ProductId) => {
    setLoading({ removeToCart: true })
    let result = false

    try {
      result = (await mockCart.remove(id)).data
    } catch (error) {
      console.warn(error)
    } finally {
      setLoading({ addToCart: false })

      getsCart().then(res => setCarts(res))
    }

    return result
  }
  const getsCart = () =>
    mockCart.gets().then(({ data: carts }) => {
      return Promise.all(
        Object.entries(carts).map(([id, count]) =>
          get(+id).then(({ data: prd }) => {
            if (prd) return { ...prd, count }
            return { id, name: 'None', count } as unknown as ICart
          })
        )
      )
    })

  const setQuery = (query: Partial<IProductQuery>) =>
    _setQuery(prev => ({ ...prev, ...query }))

  const setLoading = (loading: Partial<IProductLoading>) =>
    _setLoading(prev => ({ ...prev, ...loading }))

  return {
    carts,
    products,
    loading,
    gets,
    get,
    addToCart,
    subToCart,
    removeToCart,
    getsCart,
    query,
    setQuery,
    totalPage,
  }
}

// contextapi 생성 (초기값)
const ProductContext = createContext<IProductContext>({
  carts: [],
  products: [],
  totalPage: 0,
  query: {
    keyword: '',
    page: 1,
    pageSize: 20,
  },

  loading: {
    gets: false,
    get: false,
    addToCart: false,
    removeToCart: false,
    subToCart: false,
  },
  gets: () => Promise.resolve(false),
  get: () => Promise.resolve({ data: {} as IProduct }),
  addToCart: () => Promise.resolve(false),
  subToCart: () => Promise.resolve(false),
  removeToCart: () => Promise.resolve(false),
  getsCart: () => Promise.resolve([] as ICart[]),
  setQuery: () => null,
})

// useContext hook을 사용하여 하위 컴포넌트에서 사용
export const useProductContext = () => {
  const contextValue = useContext(ProductContext)

  return contextValue
}

// Provider로 감싸서 하위 컴포넌트에게 데이터 전달
export const ProductContextProvider = ({ children }: PropsWithChildren) => {
  const value: IProductContext = useDefaultProductContext()

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}
