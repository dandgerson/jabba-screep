import readline from 'readline'
import fs from 'fs'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// console.log(rl)
const character = {
  name: '',
}

rl.question('What is the name of your Character? ', (answer) => {
  // TODO: Log the answer in a database
  character.name = answer
  console.log(`The name of your Character is: ${character.name}`);

  // rl.close();
});

// rl.on('line', (input) => {
//   console.log(`Received: ${input}`);
// });



rl.on('close', () => {
  const url = new URL(`./src/characters/${character.name}.json`, import.meta.url)
  fs.writeFile(url, JSON.stringify(character), err => {
    if (err) console.error(err)

    console.log('The character was saved.')
  })
})
