import { Tile } from '/@services/tile'
import { IComponent } from '/@services/utils'

export class TileDrawComponent implements IComponent {
  constructor(public entity: Tile) {}

  public awake(): void {
    this.clear()
  }

  public update(): void {
    this.clear()
    this.draw()
  }

  private draw(): void {
    // draw background rect
  }

  private clear(): void {
    // clear background rect
  }
}
