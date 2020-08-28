import { Entity, Vector2D } from '/@services/utils'
import { Tile } from '/@services/tile'
import { Settings } from '/@services/settings'

export default class Grid extends Entity {
  private _tiles: Tile[] = []

  public get tiles(): Tile[] {
    return this._tiles
  }

  public awake(): void {
    // awake components
    super.awake()

    this.initTiles()

    this.tiles.forEach(tile => tile.awake())
  }

  public update(deltaTime: number): void {
    // update components
    super.update(deltaTime)

    this.tiles.forEach(tile => tile.update(deltaTime))
  }

  /**
   * Initialise the tiles on the grid.
   */
  private initTiles(): void {
    const size = Settings.grid.nodeSize
    const offset = Settings.grid.nodeOffset
    for (let y = 0; y < Settings.grid.dimension; y++) {
      for (let x = 0; x < Settings.grid.dimension; x++) {
        const start = new Vector2D(
          x * (size + offset) + offset,
          y * (size + offset) + offset
        )

        const end = new Vector2D(start.x + size, start.y + size)

        const index = new Vector2D(x, y)

        const tile = new Tile(start, end, index)
        this._tiles.push(tile)
      }
    }
  }
}
