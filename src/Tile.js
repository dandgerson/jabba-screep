import EventEmmiter from 'events'
import tileTypes from './tileTypes.js'

class Tile extends EventEmmiter {
  constructor({
    type = tileTypes.floor,
    entity = null,
    items = [],
  }) {
    super()

    Object.assign(this, {
      type,
      entity,
      items,
    })
  }
}

export default Tile
