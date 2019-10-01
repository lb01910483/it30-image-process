import { applyFilters, fib } from './utils'

let canvas
let context
let busy = false
let imageBitmapTmp
let width
let height
let sliderValueTmp
let play
const draw = () => {
  context.drawImage(imageBitmapTmp, 0, 0, width, height)
  const pixelData = context.getImageData(0, 0, width, height)
  const result = applyFilters(pixelData, sliderValueTmp)
  context.putImageData(result, 0, 0)
  requestAnimationFrame(draw)
}

onmessage = function(e) {
  if (e.data.type === 'init') {
    canvas = e.data.offscreen
    context = canvas.getContext('2d')
    width = e.data.width
    height = e.data.height
  } else if (e.data.type === 'process' && context) {
    // console.log('receive')
    // if (busy) return
    const { imageBitmap, sliderValue } = e.data

    imageBitmapTmp = imageBitmap
    sliderValueTmp = sliderValue
    if (!play) {
      play = true
      draw()
    }
    // this.console.log('fingish')
    // busy = false
  }
  // if (e.data.type === 'fib') {
  //   const result = fib(e.data.fibCount)
  //   postMessage(result)
  // }
}
