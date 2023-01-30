import { IProduct } from '../types'

const BRAND_LIST = ['삼성', 'LG', '애플']
const getRandom = (min: number, max: number) => Math.floor(Math.random() * max) + min

const generateMockProducts = () => {
  const totalLength = getRandom(5, 200)
  const mockProducts = Array.from({ length: totalLength }, (_, i) => {
    const brand = BRAND_LIST[getRandom(0, BRAND_LIST.length)]

    return {
      id: i,
      name: `[${brand}]_물품_${i}`,
      brand,
      price: getRandom(10, 100) * 1e4,
      stock: getRandom(0, 100),
      discountRate: getRandom(0, 50) / 100
    } as IProduct
  })

  return (page: number, pageSize: number, keyword: string): Promise<{
    headers: {
      page: string | number
      'total-page': string | number
    }
    data: IProduct[]
  }> => {
    const start = page * pageSize
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
          }).slice(start, end)
        })
      }, getRandom(300, 700))
    })
  }
}

export default generateMockProducts