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

export const ImageFilters = [
  'brightness',
  'contrast',
  'saturation',
  'vibrance',
  'shadow'
]

export const applyFilters = (imageData, filtersAmount) => {
  return ImageFilters.reduce((previousValue, currentValue) => {
    const filterAmount = filtersAmount[currentValue]
    if (filterAmount !== 0) {
      filter[currentValue](previousValue, filterAmount)
    }
    return previousValue
  }, imageData)
}
