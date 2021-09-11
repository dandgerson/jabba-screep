import readline from 'readline'

import Game from './src/Game.js'

const game = new Game({
  character: {
    name: 'Dandgerson',
    race: 'Human',
  },
})

const handleKeyPress = (sequence, key) => {
  const keyMap = {
    moveLeft: 'h',
    moveDown: 'j',
    moveUp: 'k',
    moveRight: 'l',
  }

  if (key.ctrl && key.name === 'c') {
    game.save()
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

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on('keypress', handleKeyPress)

game.on('start', () => console.log('Game started!'))
game.on('save', () => console.log('Game saved!'))

game.start()
