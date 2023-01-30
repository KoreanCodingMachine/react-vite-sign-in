import { useEffect } from 'react'
import styled from 'styled-components'
import { useProductContext } from '../../contexts/ProductsContext'

// function chunk<T>(arr: T[], size = 0) {
//   // arr.length: 4, size: 3 => chunk length: 2 (Math.ceil(4/3))
//   if (!size) return []

//   const newArr = Array.from(
//     { length: Math.ceil(arr.length / size) },
//     () => []
//   ) as T[][]
//   let newArrIdx = 0

//   arr.forEach((val, i) => {
//     const _arr = newArr[newArrIdx]

//     _arr.length < size && _arr.push(val)
//     _arr.length === size && newArrIdx++
//   })

//   return newArr
// }

const StyledProducts = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 480px;
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

// 1. 물품 목록 가져오기 -> context 를 사용해서 가져오는 방식을 사용
const Products = () => {
  const { loading, gets, products, query, setQuery, totalPage } =
    useProductContext()

  useEffect(() => {
    gets()
  }, [query.keyword, query.page, query.pageSize])

  return (
    <>
      <input
        value={query.keyword}
        type="text"
        onChange={e => {
          setQuery({ keyword: e.target.value.trim() })
        }}
      />

      <div style={{ display: 'flex', gap: '2px' }}>
        {Array.from({ length: totalPage }, (_, i) => (
          <div
            style={{ width: '30px', cursor: 'pointer' }}
            key={i}
            onClick={() => setQuery({ page: i + 1 })}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <StyledProducts>
        {loading.gets ? (
          <div>Loading...</div>
        ) : (
          products.map(prd => {
            return <div key={prd.id}>{prd.name}</div>
          })
        )}
      </StyledProducts>
    </>
  )
}

export default Products
