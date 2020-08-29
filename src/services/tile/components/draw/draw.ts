import { Tile } from '/@services/tile'
import { CanvasLayer } from '/@services/canvas-layer'
import { IComponent } from '/@services/utils'
import { Settings } from '/@services/settings'

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
    CanvasLayer.background.fillRect(
      this.entity.start,
      this.entity.size,
      Settings.grid.color
    )
  }

  private clear(): void {
    CanvasLayer.background.clearRect(this.entity.start, this.entity.size)
  }
}
