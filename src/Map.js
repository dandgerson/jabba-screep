import EventEmmiter from 'events'
import Tile from './Tile.js'
import tileTypes from './tileTypes.js'

class Map extends EventEmmiter {
  constructor() {
    super()
    this.tileMap = []
  }

  generateMap({ height, width }) {
    this.tileMap = Array.from(
      { length: height },
      (_, rowIndex) => Array.from(
        { length: width },
        (_, cellIndex) => {
          switch (true) {
            case rowIndex === 0:
            case rowIndex === height - 1:
            case cellIndex === 0:
            case cellIndex === width - 1: {
              return new Tile({
                type: tileTypes.wall,
              })
            }
            default: {
              return new Tile({
                type: tileTypes.floor,
              })
            }
          }
        },
      ),
    )
  }

  getTile({ y, x }) {
    if (
      y < 0
      || x < 0
      || y > this.tileMap.length
      || x > this.tileMap[0].length
    ) return new Tile({ type: tileTypes.unknown })

    return this.tileMap[y][x]
  }
}

export default Map
