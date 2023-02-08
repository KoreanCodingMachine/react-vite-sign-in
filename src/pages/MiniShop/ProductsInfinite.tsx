import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useProductContext } from '../../contexts/ProductsContext'

const StyledProducts = styled.div`
  display: flex;
  flex-direction: column;
  max-height: auto;
  min-height: 480px;
  overflow: auto;

  > div {
    padding: 12px 16px;
    border-bottom: 1px solid #232323;

    &:last-child {
      border: 0;
    }

  }
`

const ProductsInfinite = () => {
  const pageEnd = useRef<HTMLDivElement>(null)

  const { loading, gets, products, query, setQuery, totalPage } =
    useProductContext()

  const { page, keyword, pageSize } = query

  const [total, setTotal] = useState([])

  console.log('page', page)
  console.log('products', products)

  // 중복제거
  const filterArray = () => {
    const arr = total.concat(products)
    console.log('arr', arr)
    const data = [...new Set(arr)]
    setTotal(data)
  }

  const onIntersect = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        console.log('!?!?!?')
        //뷰포트에 마지막 이미지가 들어오고, page값에 1을 더하여 새 fetch 요청을 보내게됨 (useEffect의 dependency배열에 page가 있음)
        setQuery({ page: page + 1 })
        // 현재 타겟을 observe한다.
        observer.observe(entry.target)
      }
    })
  }

  useEffect(() => {
    gets()
  }, [page, keyword, pageSize])

  useEffect(() => {
    //observer 인스턴스를 생성한 후 구독
    let observer: any
    if (pageEnd) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 })
      //observer 생성 시 observe할 target 요소는 불러온 이미지의 마지막아이템(배열의 마지막 아이템)으로 지정
      if (page === totalPage) {
        observer.unobserve(pageEnd.current)
        filterArray()
      } else {
        if (products.length !== 0) {
          observer.observe(pageEnd.current)
          filterArray()
        }
      }
    }

    return () => observer && observer.disconnect()
  }, [products])

  return (
    <>
      <StyledProducts>
        {loading.gets ? (
          <div>...Loading</div>
        ) : (
          total.map(prd => {
            return <div key={prd.id}>{prd.name}</div>
          })
        )}
        {products.length === 0 ? null : <div ref={pageEnd}>............</div>}
      </StyledProducts>
    </>
  )
}

export default ProductsInfinite
