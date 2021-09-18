import EventEmitter from 'events'

class Screen extends EventEmitter {
  constructor() {
    super()

    this.c = { // code map
      esc: '\u001b',
      reset: '[0m',
      clear: '[2J',
      colors: {
        default: '[m',
        red: '[31m',
      },
    }

    this.buffer = {
      gameMap: {
        y: 1,
        x: 1,
        height: 20,
        width: process.stdout.columns,
      },
      statusArea: {
        x: 1,
        y: process.stdout.rows - 10,
        width: process.stdout.columns,
        height: 10,
      },
    }
  }

  clear() {
    process.stdout.write(`${this.c.esc}${this.c.clear}`)
  }

  renderRow({
    x = 1,
    y = 1,
    str = '',
    color = this.c.colors.default,
  }) {
    const pos = `${this.c.esc}[${y};${x}H`
    process.stdout.write(`${pos}${this.c.esc}${color}${str}${this.c.esc}${this.c.reset}`)
  }
}

export default Screen
