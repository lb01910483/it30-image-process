import * as filter from './filter'

export const fileLoad = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
export const imgLoad = src => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export const getImageData = async file => {
  try {
    const src = await fileLoad(file)
    console.log('src', src)
    const img = await imgLoad(src)
    const width = img.width
    const height = img.height
    return {
      width,
      height,
      img
    }
  } catch (e) {
    console.log(e)
  }
}

export const getImageUrl = file => {
  const objectURL = URL.createObjectURL(file)
  return objectURL
}

export const ImageFilters = [
  'brightness',
  'contrast',
  'saturation',
  'vibrance',
  'shadow',
  'hightLight',
  'sharpen'
]

// let tmp = 0
// let tmpCount = 0

export const applyFilters = (imageData, filtersAmount) => {
  return ImageFilters.reduce((previousValue, currentValue) => {
    const filterAmount = filtersAmount[currentValue]
    if (filterAmount !== 0) {
      // const t1 = performance.now()
      const result = filter[currentValue](previousValue, filterAmount)
      // const t2 = performance.now()
      // tmp += t2 - t1
      // tmpCount += 1
      // if (tmpCount === 200) {
      //   console.log('avg', tmp / tmpCount)
      // }
      return result
    }
    return previousValue
  }, imageData)
}

export const fib = i => {
  if (i === 0) return 0
  if (i === 1) return 1
  return fib(i - 1) + fib(i - 2)
}

export default {
  fib
}
