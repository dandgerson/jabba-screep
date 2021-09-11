import fs from 'fs'
import EventEmitter from 'events'

class Game extends EventEmitter {
  constructor({ character }) {
    super()
    this.character = character
  }

  emitEvent(eventName) {
    process.nextTick(() => this.emit(eventName))
  }

  save() {
    this.emitEvent('save')

    const url = new URL(`./characters/${this.character.name}.json`, import.meta.url)
    fs.writeFile(url, JSON.stringify(this.character), (err) => {
      if (err) console.error(err)
      process.exit()
    })
  }

  start() {
    this.emitEvent('start')

    console.log(`You are ${this.character.name} The ${this.character.race}!`)
  }
}

export default Game
