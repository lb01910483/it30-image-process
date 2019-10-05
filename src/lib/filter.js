const wasm = import('../../wasm/pkg')
let wasmModule
wasm
  .then(m => {
    console.log('load wasm success on util')
    wasmModule = m
  })
  .catch(e => {
    console.log('wasm load error', e)
  })

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

export const brightness = (imageData, amount) => {
  const pixelData = imageData.data
  // 每次跳四個索引，也就是一個像素，不處理透明度
  for (let i = 0; i < pixelData.length; i += 4) {
    pixelData[i] = pixelData[i] + amount // red
    pixelData[i + 1] = pixelData[i + 1] + amount // green
    pixelData[i + 2] = pixelData[i + 2] + amount // blue
  }
  return imageData
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

export const contrast = (imageData, amount) => {
  const pixelData = imageData.data
  // const factor = (259 * (amount + 255)) / (255 * (259 - amount))
  const contrastThreshold = 128
  const factor = (350 * (amount + 255)) / (255 * (350 - amount))
  for (let i = 0; i < pixelData.length; i += 4) {
    pixelData[i] =
      factor * (pixelData[i] - contrastThreshold) + contrastThreshold
    pixelData[i + 1] =
      factor * (pixelData[i + 1] - contrastThreshold) + contrastThreshold
    pixelData[i + 2] =
      factor * (pixelData[i + 2] - contrastThreshold) + contrastThreshold
  }
  return imageData
}

export const rgbToHsv = rgb => {
  let rdif
  let gdif
  let bdif
  let h
  let s

  const colorR = rgb[0] / 255
  const colorG = rgb[1] / 255
  const colorB = rgb[2] / 255
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

export const rgbToHsl = rgb => {
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const delta = max - min
  let h
  let s

  if (max === min) {
    h = 0
  } else if (r === max) {
    h = (g - b) / delta
  } else if (g === max) {
    h = 2 + (b - r) / delta
  } else if (b === max) {
    h = 4 + (r - g) / delta
  }

  h = Math.min(h * 60, 360)

  if (h < 0) {
    h += 360
  }

  const l = (min + max) / 2

  if (max === min) {
    s = 0
  } else if (l <= 0.5) {
    s = delta / (max + min)
  } else {
    s = delta / (2 - max - min)
  }

  return [h, s * 100, l * 100]
}

export const hslToRgb = hsl => {
  const h = hsl[0] / 360
  const s = hsl[1] / 100
  const l = hsl[2] / 100
  let t2
  let t3
  let val

  if (s === 0) {
    val = l * 255
    return [val, val, val]
  }

  if (l < 0.5) {
    t2 = l * (1 + s)
  } else {
    t2 = l + s - l * s
  }

  const t1 = 2 * l - t2

  const rgb = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1)
    if (t3 < 0) {
      t3++
    }

    if (t3 > 1) {
      t3--
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3
    } else if (2 * t3 < 1) {
      val = t2
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
    } else {
      val = t1
    }

    rgb[i] = val * 255
  }

  return rgb
}

export const clamp = (input, min, max) => {
  return Math.min(Math.max(input, min), max)
}

export const convertRange = (value, outputRate, baseRate = [-100, 100]) => {
  return (
    ((value - baseRate[0]) * (outputRate[1] - outputRate[0])) /
      (baseRate[1] - baseRate[0]) +
    outputRate[0]
  )
}

export const saturation = (imageData, amount) => {
  const pixelData = imageData.data
  for (let i = 0; i < pixelData.length; i += 4) {
    const [r, g, b] = [pixelData[i], pixelData[i + 1], pixelData[i + 2]]
    const hsl = rgbToHsl([r, g, b])
    hsl[1] = clamp(hsl[1] + convertRange(amount, [-100, 100]), 0, 100)
    const finalRgb = hslToRgb(hsl)
    pixelData[i] = finalRgb[0]
    pixelData[i + 1] = finalRgb[1]
    pixelData[i + 2] = finalRgb[2]
  }
  return imageData
}

export const vibrance = (imageData, amount) => {
  const pixelData = imageData.data
  const vibranceThreshold = 40
  for (let i = 0; i < pixelData.length; i += 4) {
    const [r, g, b] = [pixelData[i], pixelData[i + 1], pixelData[i + 2]]
    const hsl = rgbToHsl([r, g, b])
    if (hsl[1] < vibranceThreshold) {
      hsl[1] = clamp(
        hsl[1] + convertRange(amount, [-40, 40]),
        0,
        vibranceThreshold
      )
    }
    const finalRgb = hslToRgb(hsl)
    pixelData[i] = finalRgb[0]
    pixelData[i + 1] = finalRgb[1]
    pixelData[i + 2] = finalRgb[2]
  }
  return imageData
}

export const shadow = (imageData, amount) => {
  const pixelData = imageData.data
  const shadowThreshold = 40
  for (let i = 0; i < pixelData.length; i += 4) {
    const [r, g, b] = [pixelData[i], pixelData[i + 1], pixelData[i + 2]]
    const hsl = rgbToHsl([r, g, b])
    if (hsl[2] < shadowThreshold) {
      hsl[2] = clamp(hsl[2] + convertRange(amount, [-10, 10]), 0, 100)
    }
    const finalRgb = hslToRgb(hsl)
    pixelData[i] = finalRgb[0]
    pixelData[i + 1] = finalRgb[1]
    pixelData[i + 2] = finalRgb[2]
  }
  return imageData
}
export const hightLight = (imageData, amount) => {
  const pixelData = imageData.data
  const hightLightThreshold = 70
  for (let i = 0; i < pixelData.length; i += 4) {
    const [r, g, b] = [pixelData[i], pixelData[i + 1], pixelData[i + 2]]
    const hsl = rgbToHsl([r, g, b])
    if (hsl[2] > hightLightThreshold) {
      hsl[2] = clamp(hsl[2] + convertRange(amount, [-10, 10]), 0, 100)
    }
    const finalRgb = hslToRgb(hsl)
    pixelData[i] = finalRgb[0]
    pixelData[i + 1] = finalRgb[1]
    pixelData[i + 2] = finalRgb[2]
  }
  return imageData
}

// export const hightLight = (imageData, amount) => {
//   const pixelData = imageData.data
//   const hightLightThreshold = 50
//   const imageWidth = imageData.width
//   const imageHeight = imageData.height
//   const output = new ImageData(
//     new Uint8ClampedArray(imageData.data),
//     imageData.width,
//     imageData.height
//   )
//   const range = 3 * 3
//   const side = Math.sqrt(range)
//   const half = Math.floor(side / 2)
//   const outputPixelData = output.data

//   for (let y = 0; y < imageHeight; y++) {
//     for (let x = 0; x < imageWidth; x++) {
//       const dstOff = (y * imageWidth + x) * 4
//       let totalLightness = 0
//       let total = 0
//       for (let row = 0; row < side; row++) {
//         for (let col = 0; col < side; col++) {
//           // 尋找範圍內座標
//           const srcY = y + row - half
//           const srcX = x + col - half

//           // 如果範圍超出，退出 ex 最左上角之點
//           if (srcY < 0 || srcY > imageHeight || srcX < 0 || srcX > imageWidth) {
//             continue
//           }

//           const srcOff = (srcY * imageWidth + srcX) * 4
//           const [r, g, b] = [
//             pixelData[srcOff],
//             pixelData[srcOff + 1],
//             pixelData[srcOff + 2]
//           ]

//           const hsl = rgbToHsl([r, g, b])
//           const lightness = hsl[2]
//           totalLightness += lightness
//           total += 1
//         }
//       }
//       const avgLightness = totalLightness / total
//       if (avgLightness > hightLightThreshold) {
//         const [r, g, b] = [
//           outputPixelData[dstOff],
//           outputPixelData[dstOff + 1],
//           outputPixelData[dstOff + 2]
//         ]
//         const hsl = rgbToHsl([r, g, b])
//         hsl[2] = clamp(hsl[2] + convertRange(amount, [-10, 10]), 0, 100)
//         const finalRgb = hslToRgb(hsl)
//         outputPixelData[dstOff] = finalRgb[0]
//         outputPixelData[dstOff + 1] = finalRgb[1]
//         outputPixelData[dstOff + 2] = finalRgb[2]
//       }
//     }
//   }

//   return output
// }

export const convolve = (imageData, kernel, amount) => {
  const pixelData = imageData.data
  const imageWidth = imageData.width
  const imageHeight = imageData.height
  // 這邊需要複製一份新的資料是因為接下來算權重的時候我們需要用原本的值去做計算，不是已經計算過權重的值
  const output = new ImageData(
    new Uint8ClampedArray(imageData.data),
    imageData.width,
    imageData.height
  )
  // 尋找單邊長度，矩陣通常為奇數 3 * 3 , 5 * 5 ...
  const side = Math.sqrt(kernel.length)
  const half = Math.floor(side / 2)
  const outputPixelData = output.data

  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      const dstOff = (y * imageWidth + x) * 4
      let totalR = 0
      let totalG = 0
      let totalB = 0
      for (let row = 0; row < side; row++) {
        for (let col = 0; col < side; col++) {
          // 尋找範圍內座標
          const srcY = y + row - half
          const srcX = x + col - half

          // 如果範圍超出，退出 ex 最左上角之點
          if (
            srcY < 0 ||
            srcY >= imageHeight ||
            srcX < 0 ||
            srcX >= imageWidth
          ) {
            continue
          }

          const srcOff = (srcY * imageWidth + srcX) * 4

          const weight = kernel[row * side + col]
          const [r, g, b] = [
            pixelData[srcOff],
            pixelData[srcOff + 1],
            pixelData[srcOff + 2]
          ]
          totalR += r * weight
          totalG += g * weight
          totalB += b * weight
        }
      }
      if (amount) {
        outputPixelData[dstOff] =
          totalR * amount + outputPixelData[dstOff] * (1 - amount)
        outputPixelData[dstOff + 1] =
          totalG * amount + outputPixelData[dstOff + 1] * (1 - amount)
        outputPixelData[dstOff + 2] =
          totalB * amount + outputPixelData[dstOff + 2] * (1 - amount)
      } else {
        outputPixelData[dstOff] = totalR
        outputPixelData[dstOff + 1] = totalG
        outputPixelData[dstOff + 2] = totalB
      }
    }
  }
  return output
}

export const sharpen = (imageData, amount) => {
  if (amount > 0) {
    const sharpenKernel = [0, -1, 0, -1, 5, -1, 0, -1, 0]
    const outputRate = [0, 1]
    const base = [0, 100]
    const newImage = new ImageData(
      new Uint8ClampedArray([
        150,
        156,
        82,
        100,
        20,
        20,
        30,
        100,
        255,
        255,
        255,
        255,
        105,
        105,
        105,
        255
      ]),
      4,
      1
    )
    const result = wasmModule.convolve(
      newImage,
      sharpenKernel,
      convertRange(amount, outputRate, base)
    )
    console.log('result', result)
    return result
    // return convolve(
    //   imageData,
    //   sharpenKernel,
    //   convertRange(amount, outputRate, base)
    // )
  } else {
    const blurKernel = [
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9,
      1 / 9
    ]
    const outputRate = [0, 1]
    const base = [0, 100]
    return convolve(
      imageData,
      blurKernel,
      convertRange(Math.abs(amount), outputRate, base)
    )
  }
}
