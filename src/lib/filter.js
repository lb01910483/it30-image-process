export const grayscale = pixelData => {
  for (let i = 0; i < pixelData.length; i += 4) {
    const avg = (pixelData[i] + pixelData[i + 1] + pixelData[i + 2]) / 3
    pixelData[i] = avg // red
    pixelData[i + 1] = avg // green
    pixelData[i + 2] = avg // blue
  }
  return pixelData
}

export const invert = pixelData => {
  // 每次跳四個索引，也就是一個像素，不處理透明度
  for (let i = 0; i < pixelData.length; i += 4) {
    pixelData[i] = 255 - pixelData[i] // red
    pixelData[i + 1] = 255 - pixelData[i + 1] // green
    pixelData[i + 2] = 255 - pixelData[i + 2] // blue
  }
  return pixelData
}
