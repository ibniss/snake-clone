import { Settings } from '../settings'
import { CanvasLayer } from '../utils/canvas-layer'
import {
  ColorComponent,
  PositionComponent,
  ShapeComponent,
} from '/@services/components'
import { Family, System, Engine, Vector2D, log } from '/@services/utils'

export class RenderSystem extends System {
  private _family: Family

  constructor(_priority: number, _engine: Engine) {
    super(_priority, _engine)

    log('Creating RenderSystem family...')
    this._family = new Family(
      _engine,
      [PositionComponent, ShapeComponent, ColorComponent],
      [],
      []
    )
  }

  /**
   * Draw the static background
   */
  awake(): void {
    log('Drawing background grid...')
    CanvasLayer.background.fillRect(
      new Vector2D(0, 0),
      new Vector2D(Settings.grid.dimension, Settings.grid.dimension),
      Settings.grid.backgroundColor
    )
  }

  /**
   * Renders each drawable entity
   */
  update(): void {
    // clear canvas
    CanvasLayer.foreground.clearRect(
      new Vector2D(0, 0),
      new Vector2D(Settings.grid.dimension, Settings.grid.dimension)
    )

    // draw entities
    this._family.entities.forEach(entity => {
      const shape = entity.getComponent(ShapeComponent).shape
      const { color } = entity.getComponent(ColorComponent)
      const { position } = entity.getComponent(PositionComponent)

      switch (shape.type) {
        case 'circle':
          CanvasLayer.foreground.fillCircle(position, shape.radius, color)
          break

        case 'square':
          CanvasLayer.foreground.fillRect(
            new Vector2D(
              position.x - shape.side / 2,
              position.y - shape.side / 2
            ),
            new Vector2D(shape.side, shape.side),
            color
          )
          break
        case 'empty_square':
          CanvasLayer.foreground.drawRect(
            new Vector2D(
              position.x - shape.side / 2,
              position.y - shape.side / 2
            ),
            new Vector2D(shape.side, shape.side),
            color,
            shape.borderWidth
          )
          break
      }
    })
  }
}
