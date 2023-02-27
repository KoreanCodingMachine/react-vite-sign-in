import { atom } from 'recoil'

export const page = atom({
  key: 'products_page',
  default: 1
})

export const pageSize = atom({
  key: 'products_pageSize',
  default: 10
})

export const keyword = atom({
  key: 'products_keyword',
  default: ''
})