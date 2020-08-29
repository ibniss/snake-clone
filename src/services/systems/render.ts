import { Settings } from '../settings'
import { CanvasLayer } from '../utils/canvas-layer'
import {
  ColorComponent,
  PositionComponent,
  Shape,
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
      Settings.grid.color
    )
  }

  /**
   * Renders each drawable entity
   *
   * @param deltaTime time elapsed since last update
   */
  update(deltaTime: number): void {
    this._family.entities.forEach(entity => {
      const { shape, size } = entity.getComponent(ShapeComponent)
      const { color } = entity.getComponent(ColorComponent)
      const { position } = entity.getComponent(PositionComponent)

      switch (shape) {
        case Shape.CIRCLE:
          CanvasLayer.foreground.fillCircle(position, size, 'red')
          break

        case Shape.SQUARE:
          CanvasLayer.foreground.fillRect(
            new Vector2D(position.x - size / 2, position.y - size / 2),
            new Vector2D(size, size),
            color
          )
          break
      }
    })
  }
}
