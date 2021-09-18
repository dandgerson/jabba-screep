import EventEmitter from 'events'
import fs from 'fs'

class Game extends EventEmitter {
  constructor({ character }) {
    super()

    Object.assign(this, {
      character,
    })
  }

  save() {
    const url = new URL(`./characters/${this.character.name}.json`, import.meta.url)

    try {
      fs.writeFileSync(url, JSON.stringify(this.character))
    } catch (err) {
      if (err) console.error(err)
    }

    console.log('--> Game saved!')
  }
}

export default Game
