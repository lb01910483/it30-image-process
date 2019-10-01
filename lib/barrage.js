class Barrage {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.data = []
  }

  addBarrage(options) {
    const barrage = {
      x: this.canvas.width, // 初始值是畫面整個寬度，也就是在最右邊
      y: this.canvas.height * Math.random(), // 隨機在任一高度出現
      speed: options.speed || Math.random() * 10 + 0.5, // 每次移動速度
      fontSize: options.fontSize || Math.random() * 10 + 16, // 繪製字體大小
      color:
        options.color || `#${(((1 << 24) * Math.random()) | 0).toString(16)}`, // 字體顏色
      text: options.text || 'default' // 文字
    }
    this.data.push(barrage)
  }
  draw() {
    // 從最後開始，因為當檢查到超出範圍的彈幕時要把他移除
    for (let i = this.data.length - 1; i >= 0; i -= 1) {
      const barrage = this.data[i]
      this.ctx.font = `${barrage.fontSize}px Microsoft JhengHei, PMingLiU, sans-serif`
      // 確認彈幕是否超出邊界需要在加上字體本身寬度，因為 x 代表是整個文字的最左邊
      const textWidth = this.ctx.measureText(barrage.text).width
      const checkDisappear = barrage.x + textWidth < 0
      if (checkDisappear) {
        this.data.splice(i, 1)
      } else {
        this.ctx.fillStyle = barrage.color
        barrage.x = barrage.x - barrage.speed
        this.ctx.fillText(barrage.text, barrage.x, barrage.y)
      }
    }
  }
}

export default Barrage
