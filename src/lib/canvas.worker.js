import { applyFilters, fib } from './utils'
onmessage = function(e) {
  if (e.data.type === 'fib') {
    const result = fib(e.data.fibCount)
    postMessage(result)
  }
}
