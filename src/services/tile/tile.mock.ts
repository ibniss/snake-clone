import { Tile } from './tile'
import { Vector2D } from '/@services/utils'

export const mockTileFactory = (
  start = new Vector2D(0, 0),
  end = new Vector2D(1, 1),
  index = new Vector2D(0, 0)
): Tile => new Tile(start, end, index)
