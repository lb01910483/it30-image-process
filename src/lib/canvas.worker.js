import { applyFilters, fib } from './utils'
import Barrage from './barrage'
let canvas
let context
let imageBitmapTmp
let width
let height
let sliderValueTmp
let play
let barrage
let tmpFps = 0
let tmpCount = 0
let lastCallTime = 0
const draw = () => {
  const current = performance.now()
  const fps = 1000 / (current - lastCallTime)
  // tmpFps += fps
  // tmpCount += 1
  // if (tmpCount === 100) {
  //   console.log('avg', tmpFps / tmpCount)
  // }
  lastCallTime = performance.now()
  context.drawImage(imageBitmapTmp, 0, 0, width, height)
  const pixelData = context.getImageData(0, 0, width, height)
  const result = applyFilters(pixelData, sliderValueTmp)
  context.putImageData(result, 0, 0)
  barrage.draw()
  requestAnimationFrame(draw)
}

onmessage = function(e) {
  if (e.data.type === 'init') {
    canvas = e.data.offscreen
    context = canvas.getContext('2d')
    width = e.data.width
    height = e.data.height
    barrage = new Barrage({ ctx: context, width, height })
  } else if (e.data.type === 'process' && context) {
    const { imageBitmap, sliderValue } = e.data

    imageBitmapTmp = imageBitmap
    sliderValueTmp = sliderValue
    if (!play) {
      play = true
      draw()
    }
  } else if (e.data.type === 'barrage' && barrage) {
    barrage.addBarrage(e.data.data)
    this.console.log('barrage', barrage)
  }
  // if (e.data.type === 'fib') {
  //   const result = fib(e.data.fibCount)
  //   postMessage(result)
  // }
}
