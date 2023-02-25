import { IProduct } from '../types'

const BRAND_LIST = ['삼성', 'LG', '애플']
const getRandom = (min: number, max: number) => Math.floor(Math.random() * max) + min

const generateMockProducts = () => {
  const totalLength = getRandom(20, 400)
  const mockProducts = Array.from({ length: totalLength }, (_, i) => {
    const brand = BRAND_LIST[getRandom(0, BRAND_LIST.length)]

    return {
      id: i,
      name: `[${brand}]_물품_${i}`,
      brand,
      price: getRandom(10, 100) * 1e4,
      stock: getRandom(0, 100),
      discountRate: getRandom(0, 50) / 100,
    } as IProduct
  })

  return {
    gets: (page: number, pageSize: number, keyword: string): Promise<{
      headers: {
        page: string | number
        'total-page': string | number
      }
      data: IProduct[]
    }> => {
      // 페이지네이션 할  데이터 
      const start = (page-1) * pageSize 
      const end = start + pageSize

      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            headers: {
              page,
              'total-page': Math.ceil(totalLength / pageSize)
            },
            data: mockProducts.filter(({ name, brand }) => {
              return name.match(keyword) || brand.match(keyword)
            }).slice(start,end)
          })
        }, getRandom(300, 700))
      })
    },

    get: (id: IProduct['id']): Promise<{
      data: IProduct | undefined
    }> => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            data: mockProducts.find((prd) => prd.id === id)
          })
        }, getRandom(300, 700))
      })
    }
  }
}

export default generateMockProducts