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
