import { selector } from 'recoil'
import { productsApi } from '../../api'
import * as productsAtom from './products-atom'

export const productsQuery = selector({
  key: 'products_query',
  async get({ get }) {
    const page = get(productsAtom.page)
    const pageSize = get(productsAtom.pageSize)
    const keyword = get(productsAtom.keyword)

    try {
      const { headers, data } = await productsApi.gets(page, pageSize, keyword)

      return {
        totalPage: headers['total-page'],
        products: data,
      }
    } catch (error) {
      console.warn(error)

      throw error
    }
  },
})
