import fs from 'fs'

import Engine from './src/Engine.js'

const engine = new Engine()
engine.init()

const character = {
  name: 'Dandgerson',
  race: 'Human',
}

engine.on('start', () => console.log('--> Game started!'))
engine.on('save', () => {
  const url = new URL(`./src/characters/${character.name}.json`, import.meta.url)
  fs.writeFile(url, JSON.stringify(character), (err) => {
    if (err) console.error(err)

    console.log('--> Game saved!')
    process.exit()
  })
})

engine.start()

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
      columns: 30,
      rows: 20,
    },
    corners: {
      topLeft: {
        coords: [1, 1], // [y, x]
        symbol: '\u2554',
      },
      bottomLeft: {
        get coords() { return [boxConfig.size.rows, 1] },
        symbol: '\u255A',
      },
      topRight: {
        get coords() { return [1, boxConfig.size.columns] },
        symbol: '\u2557',
      },
      bottomRight: {
        get coords() { return [boxConfig.size.rows, boxConfig.size.columns] },
        symbol: '\u255D',
      },
    },
    symbols: {
      horizontal: '\u2550',
      vertical: '\u2551',
    },
  }

  for (let row = 1; row <= boxConfig.size.rows; row++) {
    for (let column = 1; column <= boxConfig.size.columns; column++) {
      switch ([row, column].toString()) {
        case boxConfig.corners.topLeft.coords.toString(): {
          renderRow({ y: row + 1, x: column + 1, str: boxConfig.corners.topLeft.symbol })
          break
        }
        case boxConfig.corners.topRight.coords.toString(): {
          renderRow({ y: row + 1, x: column + 1, str: boxConfig.corners.topRight.symbol })
          break
        }
        case boxConfig.corners.bottomRight.coords.toString(): {
          renderRow({ y: row + 1, x: column + 1, str: boxConfig.corners.bottomRight.symbol })
          break
        }
        case boxConfig.corners.bottomLeft.coords.toString(): {
          renderRow({ y: row + 1, x: column + 1, str: boxConfig.corners.bottomLeft.symbol })
          break
        }
        default: renderRow({ y: row + 1, x: column + 1, str: '.' })
      }
    }
  }
}

renderStatusArea()
