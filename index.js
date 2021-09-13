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

game.on('start', () => console.log('--> Game started!'))
game.on('save', () => console.log('--> Game saved!'))

game.start()

console.log({
  isTTY: process.stdout.isTTY,
  title: process.title,
  rows: process.stdout.rows,
  columns: process.stdout.columns,
})

const c = { // code map
  esc: '\u001b',
  reset: '[0m',
  clear: '[2J',
  colors: {
    default: '[m',
    red: '[31m',
  },
}

const renderRow = ({
  x = 1,
  y = 1,
  str = '',
  color = c.colors.default,
}) => {
  const pos = `${c.esc}[${y};${x}H`
  process.stdout.write(`${pos}${c.esc}${color}${str}${c.esc}${c.reset}`)
}

const clearScreen = () => {
  process.stdout.write(`${c.esc}${c.clear}`)
}

const hRune = '\u16BA'

clearScreen()
renderRow({
  x: 1,
  y: 4,
  str: 'Dandgerson',
  color: c.colors.red,
})

const layout = {
  statusArea: {
    x: 1,
    y: process.stdout.rows - 10,
    width: process.stdout.columns,
    height: 10,
  },
}

const renderStatusArea = () => {
  const boxConfig = {
    size: {
      columns: 10,
      rows: 10,
    },
    symbols: {
      leftTopCorner: '\u2554',
      leftBottomCorner: '\u255A',
      rightTopCorner: '\u2557',
      rigntBottomCorner: '\u255D',
      horizontal: '\u2550',
      vertical: '\u2551',
    },
  }

  Array.from(Array(boxConfig.size.rows).keys()).forEach(row => {
    console.log({ row })
  })
}

renderStatusArea()
