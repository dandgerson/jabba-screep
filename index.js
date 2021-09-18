import Engine from './src/Engine.js'
import Game from './src/Game.js'
import Map from './src/Map.js'
import Screen from './src/Screen.js'

const engine = new Engine()
const game = new Game({
  character: {
    name: 'Dandgerson',
    race: 'Human',
  },
})
const screen = new Screen()

engine.init()

const map = new Map()

engine.on('start', () => {
  console.log('--> Engine started!')

  screen.clear()

  map.generateMap({
    height: screen.buffer.gameMap.height,
    width: screen.buffer.gameMap.width,
  })

  engine.emitEvent('mapUpdated')
})

engine.on('save', () => {
  game.save()
  engine.stop()
})

engine.on('mapUpdated', () => {
  console.log('Map Updated!')
  console.log({ tileMap: map.tileMap })
})

engine.start()

// const hRune = '\u16BA'

// const renderStatusArea = () => {
//   const boxConfig = {
//     size: {
//       columns: 30,
//       rows: 20,
//     },
//     corners: {
//       topLeft: {
//         coords: [1, 1], // [y, x]
//         symbol: '\u2554',
//       },
//       bottomLeft: {
//         get coords() { return [boxConfig.size.rows, 1] },
//         symbol: '\u255A',
//       },
//       topRight: {
//         get coords() { return [1, boxConfig.size.columns] },
//         symbol: '\u2557',
//       },
//       bottomRight: {
//         get coords() { return [boxConfig.size.rows, boxConfig.size.columns] },
//         symbol: '\u255D',
//       },
//     },
//     symbols: {
//       horizontal: '\u2550',
//       vertical: '\u2551',
//     },
//   }

//   for (let row = 1; row <= boxConfig.size.rows; row++) {
//     for (let column = 1; column <= boxConfig.size.columns; column++) {
//       switch ([row, column].toString()) {
//         case boxConfig.corners.topLeft.coords.toString(): {
//           renderRow({ y: row + 1, x: column + 1, str: boxConfig.corners.topLeft.symbol })
//           break
//         }
//         case boxConfig.corners.topRight.coords.toString(): {
//           renderRow({ y: row + 1, x: column + 1, str: boxConfig.corners.topRight.symbol })
//           break
//         }
//         case boxConfig.corners.bottomRight.coords.toString(): {
//           renderRow({ y: row + 1, x: column + 1, str: boxConfig.corners.bottomRight.symbol })
//           break
//         }
//         case boxConfig.corners.bottomLeft.coords.toString(): {
//           renderRow({ y: row + 1, x: column + 1, str: boxConfig.corners.bottomLeft.symbol })
//           break
//         }
//         default: renderRow({ y: row + 1, x: column + 1, str: '.' })
//       }
//     }
//   }
// }
