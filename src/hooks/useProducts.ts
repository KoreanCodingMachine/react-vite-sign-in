import { useMemo } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { productsAtom, productsQuery } from '../recoil/products'

type ProductParams = {
  page?: number
  pageSize?: number
  keyword?: string
}

export const useProductsParams = () => {
  const [page, setPage] = useRecoilState(productsAtom.page)
  const [pageSize, setPageSize] = useRecoilState(productsAtom.pageSize)
  const [keyword, setKeyword] = useRecoilState(productsAtom.keyword)
  const setters = {
    page: setPage,
    pageSize: setPageSize,
    keyword: setKeyword,
  }

  const setParams = (params: ProductParams) => {
    const keys = Object.keys(params) as (keyof ProductParams)[]
    
    keys.forEach(key => {
      const value = params[key]

      if (value != null) setters[key](() => value as any)
    })
  }

  return {
    page,
    pageSize,
    keyword,
    setParams
  }
}

export const useProducts = () => {
  const loadable = useRecoilValueLoadable(productsQuery)
  const loading = useMemo(() => loadable.state === 'loading', [loadable.state]) // 경우의 수가 고정되어 있어서 
  const result = useMemo(() => {
    return loadable.state === 'hasValue'
      ? loadable.contents
      : {
          totalPage: 0,
          products: [],
        }
  }, [loadable])

  return { loading, ...result }
}
