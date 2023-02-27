import { selector } from 'recoil'
import { productsApi } from '../../api'
import * as productsAtom from './products-atom'

export const productsQuery = selector({
  key: 'products_query',
  get({ get }) {
    const page = get(productsAtom.page)
    const pageSize = get(productsAtom.pageSize)
    const keyword = get(productsAtom.keyword)

    console.log({ page, pageSize, keyword })

    return productsApi.gets(page, pageSize, keyword).then(res => {
      const { headers, data } = res

      return {
        totalPage: headers['total-page'],
        products: data,
      }
    })
  },
})
