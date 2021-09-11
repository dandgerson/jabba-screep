import readline from 'readline'
import fs from 'fs'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const saveCharacter = () => {
  const url = new URL(`./src/characters/${character.name}.json`, import.meta.url)
  fs.writeFile(url, JSON.stringify(character), (err) => {
    if (err) console.error(err)

    console.log('The character was saved.')
  })
}

const startGame = (character) => {
  console.log(`You are ${character.name} The ${character.race}!`)

  process.stdin.setRawMode(true);
  process.stdin.on('keypress', (...args) => {
    console.log({ args })
  })
}

const endGame = () => {
  rl.question('Save your Character? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) saveCharacter()

    rl.question('Are you sure you want to exit? ', (answer) => {
      if (answer.match(/^y(es)?$/i)) rl.pause()
    })
  })
}

const character = {}

rl.question('Who are you? ', (answer) => {
  // TODO: Log the answer in a database
  character.name = answer
  console.log(`You are the ${character.name}`)

  // rl.close();
  rl.question('What is your race? ', (answer) => {
    character.race = answer
    console.log(`Your race is ${character.race}`)


    rl.question('Ready for Adventure? ', (answer) => {
      if (answer.match(/^y(es)?$/i)) startGame(character)
    })
  })
})




rl.on('close', () => endGame())
rl.on('SIGINT', () => endGame())
