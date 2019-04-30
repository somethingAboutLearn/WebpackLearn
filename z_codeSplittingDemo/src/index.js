// 1. .then()
// function getA() {
//   return import('./A').then(({ default: a }) => {
//     console.log('a => ', a)
//     return a
//   })
// }

// getA().then(func => {
//   console.log('func => ', func)
//   func()
// })

// 2. async await
async function getA() {
  let res = await import('./A')
  console.log('getA res => ', res)
  return res.default()
}

getA()
