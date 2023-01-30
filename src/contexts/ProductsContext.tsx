import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { IProduct } from '../types'
import generateMockProducts from './products-mock'

const getProducts = generateMockProducts()

interface IProductQuery {
  keyword: string
  page: number
  pageSize: number
}

interface IProductLoading {
  gets: boolean
  get: boolean
  addToCart: boolean
}

interface IProductContext {
  // state
  products: IProduct[]
  totalPage: number
  query: IProductQuery
  loading: IProductLoading

  // actions (request server)
  gets(): Promise<void>
  get(id: string): Promise<IProduct>
  addToCart(id: string): Promise<any>

  setQuery(query: Partial<IProductQuery>): void
}

const useDefaultProductContext = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [totalPage, setTotalPage] = useState(0)
  const [query, _setQuery] = useState<IProductQuery>({
    keyword: '',
    page: 1,
    pageSize: 20,
  })
  const [loading, _setLoading] = useState<IProductLoading>({
    gets: false,
    get: false,
    addToCart: false,
  })

  const gets = () => {
    setLoading({ gets: true })

    return getProducts(query.page, query.pageSize, query.keyword)
      .then(res => {
        setProducts(res.data)
        setTotalPage(+res.headers['total-page'])
      })
      .finally(() => {
        setLoading({ gets: false })
      })
  }

  const get = (id: string) => {
    return Promise.resolve({} as IProduct)
  }

  const addToCart = (id: string) => {
    return Promise.resolve()
  }

  const setQuery = (query: Partial<IProductQuery>) =>
    _setQuery(prev => ({ ...prev, ...query }))

  const setLoading = (loading: Partial<IProductLoading>) =>
    _setLoading(prev => ({ ...prev, ...loading }))

  return { products, loading, gets, get, addToCart, query, setQuery, totalPage }
}

// contextapi 생성 (초기값)
const ProductContext = createContext<IProductContext>({
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
  },

  gets: () => Promise.resolve(),
  get: () => Promise.resolve({} as IProduct),
  addToCart: () => Promise.resolve(),
  setQuery: () => null,
})

// useContext hook을 사용하여 하위 컴포넌트에서 사용
export const useProductContext = () => {
  const contextValue = useContext(ProductContext)

  return contextValue
}

// Provider로 감싸서 하위 컴포넌트에게 데이터 전달
export const ProductContextProvider = ({
  children,
}: PropsWithChildren<any>) => {
  const value = useDefaultProductContext()

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}
