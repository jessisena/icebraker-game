export function Generator(input) {
  let i, j, k
  let r = 0 // card counter
  const n = input | 3 //

  // -- First card:
  console.log(`Card ${++r}:  `)
  for (i = 0; i <= n; i++) {
    console.log(i)
  }
  console.log()

  // -- Next n cards:
  for (j = 0; j < n; j++) {
    console.log(`Card ${++r}:  `)
    for (k = 0; k < n; k++) {
      console.log(n + 1 + n * j + k)
    }
    console.log()
  }

  // -- Final n*n cards:
  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      console.log(`Card ${++r}:  `)
      console.log(i + 1)
      for (k = 0; k < n; k++) {
        // (i * k + j) % n is valid only for prime number n
        console.log(n + 1 + n * k + ((i * k + j) % n))
      }
      console.log()
    }
  }
}
