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

export const brightness = (pixelData, amount) => {
  // 每次跳四個索引，也就是一個像素，不處理透明度
  for (let i = 0; i < pixelData.length; i += 4) {
    pixelData[i] = pixelData[i] + amount // red
    pixelData[i + 1] = pixelData[i + 1] + amount // green
    pixelData[i + 2] = pixelData[i + 2] + amount // blue
  }
  return pixelData
}
export const calculateBrightness = pixelData => {
  const tmp = {}
  for (let i = 0; i < pixelData.length; i += 4) {
    const red = pixelData[i]
    const green = pixelData[i + 1]
    const blue = pixelData[i + 2]
    const brightness = Math.round(0.299 * red + 0.587 * green + 0.114 * blue)
    tmp[brightness] = tmp[brightness] || 0
    tmp[brightness] += 1
    // pixelData[i] = brightness
    // pixelData[i + 1] = brightness
    // pixelData[i + 2] = brightness
  }
  const result = []
  Object.keys(tmp).forEach(key => {
    result.push([key, tmp[key]])
  })
  return result
}

export const contrast = (pixelData, amount) => {
  // const factor = (259 * (amount + 255)) / (255 * (259 - amount))
  const factor = (350 * (amount + 255)) / (255 * (350 - amount))
  for (let i = 0; i < pixelData.length; i += 4) {
    pixelData[i] = factor * (pixelData[i] - 128) + 128
    pixelData[i + 1] = factor * (pixelData[i + 1] - 128) + 128
    pixelData[i + 2] = factor * (pixelData[i + 2] - 128) + 128
  }
  return pixelData
}

export const rgbToHsv = (r, g, b) => {
  let rdif
  let gdif
  let bdif
  let h
  let s

  const colorR = r / 255
  const colorG = g / 255
  const colorB = b / 255
  const v = Math.max(colorR, colorG, colorB)
  const diff = v - Math.min(colorR, colorG, colorB)
  const diffc = c => {
    return (v - c) / 6 / diff + 1 / 2
  }

  if (diff === 0) {
    h = 0
    s = 0
  } else {
    s = diff / v
    rdif = diffc(colorR)
    gdif = diffc(colorG)
    bdif = diffc(colorB)

    if (colorR === v) {
      h = bdif - gdif
    } else if (colorG === v) {
      h = 1 / 3 + rdif - bdif
    } else if (colorB === v) {
      h = 2 / 3 + gdif - rdif
    }

    if (h < 0) {
      h += 1
    } else if (h > 1) {
      h -= 1
    }
  }

  return [h * 360, s * 100, v * 100]
}

export const hsvToRgb = hsv => {
  const h = hsv[0] / 60
  const s = hsv[1] / 100
  let v = hsv[2] / 100
  const hi = Math.floor(h) % 6

  const f = h - Math.floor(h)
  const p = 255 * v * (1 - s)
  const q = 255 * v * (1 - s * f)
  const t = 255 * v * (1 - s * (1 - f))
  v *= 255

  switch (hi) {
    case 0:
      return [v, t, p]
    case 1:
      return [q, v, p]
    case 2:
      return [p, v, t]
    case 3:
      return [p, q, v]
    case 4:
      return [t, p, v]
    case 5:
      return [v, p, q]
  }
}

export const clamp = (input, min, max) => {
  return Math.min(Math.max(input, min), max)
}

export const convertRange = (value, outputRate) => {
  const baseRate = [-100, 100]
  return (
    ((value - baseRate[0]) * (outputRate[1] - outputRate[0])) /
      (baseRate[1] - baseRate[0]) +
    outputRate[0]
  )
}

export const saturation = (pixelData, amount) => {
  for (let i = 0; i < pixelData.length; i += 4) {
    const [r, g, b] = [pixelData[i], pixelData[i + 1], pixelData[i + 2]]
    const hsv = rgbToHsv(r, g, b)
    hsv[1] = clamp(hsv[1] + amount, 0, 100)
    // hsv[1] = clamp(hsv[1] + convertRange(amount, [-20, 20]), 0, 100)
    const finalRgb = hsvToRgb(hsv)
    pixelData[i] = finalRgb[0]
    pixelData[i + 1] = finalRgb[1]
    pixelData[i + 2] = finalRgb[2]
  }
  return pixelData
}
