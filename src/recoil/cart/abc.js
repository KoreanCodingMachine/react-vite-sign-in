// res.data = {
//     *   a123: 10,
//     *   b234: 3,
//     *   c456: 1
//     * }
//     *
//     * =>
//     *
//     * res.data = [
//     *   { id: 'a123', count: 10 },
//     *   { id: 'b234', count: 3 },
//     *   { id: 'c456', count: 1 },
//     * ]

const data = {
  a123: 10,
  b234: 3,
  c456: 1,
}

const obj = Object.entries(data).map(v => {
  const key = v[0]
  const val = v[1]

  return {
    id: key,
    count: val,
  }
})

// index: 0, v = [a123,10]
// ['a123', 10] => { '0': 'a123', '1': 10 }

console.log(obj)
