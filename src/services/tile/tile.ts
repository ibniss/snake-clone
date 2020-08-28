import { Entity, Vector2D } from '/@services/utils'
import { TileDrawComponent } from './components'

export class Tile extends Entity {
  public get size(): Vector2D {
    return new Vector2D(this.end.x - this.start.x, this.end.y - this.start.y)
  }

  public get center(): Vector2D {
    return new Vector2D(
      this.start.x + this.size.x / 2,
      this.start.y + this.size.y / 2
    )
  }

  constructor(
    public readonly start: Vector2D,
    public readonly end: Vector2D,
    public readonly index: Vector2D
  ) {
    super()
  }

  public awake(): void {
    this.addComponent(new TileDrawComponent(this))

    super.awake()
  }
}
