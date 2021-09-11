import fs from 'fs'

class Game {
  constructor({ character }) {
    this.character = character
  }

  save() {
    const url = new URL(`./characters/${this.character.name}.json`, import.meta.url)
    fs.writeFile(url, JSON.stringify(this.character), (err) => {
      if (err) console.error(err)

      console.log('saved successful.')
      process.exit()
    })
  }

  start() {
    console.log(`You are ${this.character.name} The ${this.character.race}!`)
  }
}

export default Game
