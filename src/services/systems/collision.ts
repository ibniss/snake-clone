import { System, Family, Engine, Vector2D } from '/@services/utils'
import {
  PositionComponent,
  DrawableComponent,
  CollidableComponent,
  Shape,
  MovableComponent,
} from '/@services/components'
import { Settings } from '../settings'

export class CollisionSystem extends System {
  private _family: Family

  constructor(_priority: number, _engine: Engine) {
    super(_priority, _engine)

    this._family = new Family(
      _engine,
      [PositionComponent, DrawableComponent, CollidableComponent],
      [],
      []
    )
  }

  update(): void {
    // loop through all elements that could move
    this._family.entities
      .filter(e => e.hasComponent(MovableComponent))
      .forEach(entity => {
        const collidable = entity.getComponent(CollidableComponent)
        const { shape } = entity.getComponent(DrawableComponent)
        const { position } = entity.getComponent(PositionComponent)

        // check for border collision separately
        if (collidable.collidesWith.includes('border')) {
          const collidesWithBorder = this._checkBorderCollision(shape, position)
          if (collidesWithBorder) {
            console.log(collidable.tag, 'border')
          }
        }

        // figure out other entities current entity could collide with
        const canCollideWith = this._family.entities.filter(e =>
          collidable.collidesWith.includes(
            e.getComponent(CollidableComponent).tag
          )
        )

        canCollideWith.forEach(collideEntity => {
          const { tag: collideTag } = collideEntity.getComponent(
            CollidableComponent
          )
          const { shape: collideShape } = collideEntity.getComponent(
            DrawableComponent
          )
          const { position: collidePosition } = collideEntity.getComponent(
            PositionComponent
          )

          const collides = this._checkCollision(
            shape,
            collideShape,
            position,
            collidePosition
          )

          if (collides) {
            console.log(collidable.tag, collideTag)
          }
        })
      })
  }

  /**
   * Check if objects A and B collide
   *
   * @param shapeA
   * @param shapeB
   * @param positionA
   * @param positionB
   */
  private _checkCollision(
    shapeA: Shape,
    shapeB: Shape,
    positionA: Vector2D,
    positionB: Vector2D
  ): boolean {
    if (shapeA.type === 'circle' && shapeB.type === 'circle') {
      const distance = Vector2D.subtract(positionA, positionB).length
      return distance < shapeA.radius + shapeB.radius
    }
    return false
  }

  /**
   * Check if an object collides with the border
   */
  private _checkBorderCollision(shape: Shape, position: Vector2D): boolean {
    switch (shape.type) {
      case 'circle':
        return (
          position.x + shape.radius > Settings.grid.dimension ||
          position.x - shape.radius < 0 ||
          position.y + shape.radius > Settings.grid.dimension ||
          position.y - shape.radius < 0
        )
      default:
        return false
    }
  }
}
