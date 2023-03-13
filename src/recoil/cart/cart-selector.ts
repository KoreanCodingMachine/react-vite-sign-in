import { selector } from 'recoil'
import { cartApi } from '../../api'

export const cartQuery = selector({
  key: 'cart_query',
  get() {
    /**
     * 
     * res.data = {
     *   a123: 10,
     *   b234: 3,
     *   c456: 1
     * }
     * 
     * => 
     * 
     * res.data = [
     *   { id: 'a123', count: 10 },
     *   { id: 'b234', count: 3 },
     *   { id: 'c456', count: 1 },
     * ]
     * 
     */
    const result = cartApi.gets()
      .then(res => Object.entries(res.data).map(([id, count]) => ({ id, count })))
    
    return result

    // return cartApi.gets().then(res => {
    //   return Object.entries(res.data).map(([id, count]) => ({ id, count }))
    // })

    // const res = await cartApi.gets()

    // return Object.entries(res.data).map(([id, count]) => ({ id, count }))
  },
})

// function forEach<T>(arr: T[], callback: (value: T, index: number, arr: T[]) => void) {
//   for (let i = 0; i < arr.length; i++) {
//     const value = arr[i]

//     callback(value, i, arr)
//   }
// }

// forEach([1,2,3,4], (value, index) => {
//   console.log(`value: ${value}, index: ${index}`)
// })

// function map<T, U>(arr: T[], callback: (value: T, index: number, arr: T[]) => U) {
//   const newArr: U[] = []

//   for (let i = 0; i < arr.length; i++) {
//     const value = arr[i]

//     newArr.push(callback(value, i, arr))
//   }

//   return newArr
// }

// map([1,2,3,4], (value) => `${value}`)