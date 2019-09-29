class Barrage {
  constructor(canvas, data) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.data = data || []
  }

  addBarrage(options) {
    const barrage = {
      x: this.canvas.width,
      y: this.canvas.height * Math.random(),
      speed: options.speed || Math.random() * 10 + 0.5,
      fontSize: options.fontSize || Math.random() * 10 + 16,
      color:
        options.color || `#${(((1 << 24) * Math.random()) | 0).toString(16)}`,
      text: options.text || 'default'
    }
    this.data.push(barrage)
  }
  draw() {
    for (let i = this.data.length - 1; i >= 0; i -= 1) {
      const barrage = this.data[i]
      this.ctx.font = `${barrage.fontSize}px Microsoft JhengHei, PMingLiU, sans-serif`
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
