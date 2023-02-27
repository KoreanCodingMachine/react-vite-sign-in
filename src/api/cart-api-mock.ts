import { IProduct } from '../types'

type ProductId = IProduct['id']

const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min

const generateCartApiMock = () => {
  const mockProductIdMap: {
    [id: number]: number
  } = {}

  return {
    // 장바구니에 추가 (product 를 받음)
    // add 를 계속 호출하면, 수량이 증가함
    add(productId: ProductId): Promise<{ data: boolean }> {
      return new Promise(resolve => {
        setTimeout(() => {
          if (!mockProductIdMap[productId]) {
            mockProductIdMap[productId] = 0
          }

          mockProductIdMap[productId]++

          resolve({ data: true })
        }, getRandom(100, 200))
      })
    },

    // 장바구니의 수량을 감소시킴
    // 수량이 0이 되면 장바구니 목록에서 삭제
    sub(productId: ProductId): Promise<{ data: boolean }> {
      return new Promise(resolve => {
        setTimeout(() => {
          if (!mockProductIdMap[productId]) {
            return resolve({ data: false })
          }

          mockProductIdMap[productId]--

          if (!mockProductIdMap[productId]) {
            delete mockProductIdMap[productId]
          }

          resolve({ data: true })
        }, getRandom(100, 200))
      })
    },

    // 장바구니에서 삭제 (productId 를 받음)
    remove(productId: ProductId): Promise<{ data: boolean }> {
      return new Promise(resolve => {
        setTimeout(() => {
          delete mockProductIdMap[productId]

          resolve({ data: true })
        }, getRandom(100, 200))
      })
    },

    gets(): Promise<{
      data: {
        [id: number]: number
      }
    }> {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: mockProductIdMap,
          })
        }, getRandom(100, 200))
      })
    },
  }
}

export default generateCartApiMock
