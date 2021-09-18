import EventEmitter from 'events'
import readline from 'readline'

class Engine extends EventEmitter {
  constructor() {
    super()
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  emitEvent(eventName) {
    process.nextTick(() => this.emit(eventName))
  }

  stop() {
    this.emitEvent('stop')
    console.log('--> Engine stopped!')

    process.exit()
  }

  init() {
    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)
    process.stdin.on('keypress', this.handleKeyPress)
  }

  save() {
    this.emitEvent('save')
  }

  start() {
    this.emitEvent('start')
  }

  handleKeyPress(sequence, key) {
    const keyMap = {
      moveLeft: 'h',
      moveDown: 'j',
      moveUp: 'k',
      moveRight: 'l',
    }

    if (key.ctrl && key.name === 'c') {
      this.save()
    }

    switch (sequence) {
      case keyMap.moveLeft: {
        console.log('moveLeft', sequence)
        break
      }
      case keyMap.moveRight: {
        console.log('moveRight', sequence)
        break
      }
      case keyMap.moveUp: {
        console.log('moveUp', sequence)
        break
      }
      case keyMap.moveDown: {
        console.log('moveDown', sequence)
        break
      }
      default: break
    }
  }
}

export default Engine
