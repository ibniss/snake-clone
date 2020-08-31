import {
  MovableComponent,
  PositionComponent,
  EntityChainComponent,
  DrawableComponent,
} from '/@services/components'
import { System, Engine, Family, Vector2D, Entity } from '/@services/utils'

export class MoveSystem extends System {
  private _family: Family

  constructor(_priority: number, _engine: Engine) {
    super(_priority, _engine)

    this._family = new Family(
      _engine,
      [PositionComponent, MovableComponent],
      [],
      []
    )
  }

  /**
   * Update the position of entities
   *
   * @param deltaTime time elapsed
   */
  public update(deltaTime: number): void {
    this._family.entities.forEach(entity => {
      const [newPosition, moveVector] = this._moveEntity(deltaTime, entity)

      // if entity has a chain of other components, update their positions too
      if (entity.hasComponent(EntityChainComponent)) {
        const chain = entity.getComponent(EntityChainComponent)
        const drawable = entity.getComponent(DrawableComponent)

        let moveTo = newPosition.clone()

        chain.positionComponents.forEach(comp => {
          const difference = Vector2D.subtract(moveTo, comp.position)
          const distance = difference.length

          // don't move if too close
          if (distance > drawable.minDistance) {
            const orientation = difference.normalise()
            moveTo = comp.position
              .add(Vector2D.times(orientation, moveVector.length))
              .clone()
          }
        })
      }
    })
  }

  /**
   * Move a given entity according to its velocity and angle
   *
   * @param deltaTime time elapsed in ms
   * @param entity entity to update position of
   * @returns the new position and move vector
   */
  private _moveEntity(deltaTime: number, entity: Entity): [Vector2D, Vector2D] {
    const { velocity, angle } = entity.getComponent(MovableComponent)

    const moveVector = this._getMovementVector(deltaTime, velocity, angle)
    const { position } = entity.getComponent(PositionComponent)
    return [position.add(moveVector), moveVector]
  }

  /**
   * Get the delta vector to use to move based on velocity and angle
   *
   * @param deltaTime time elapsed in ms
   * @param oldPosition old position vector
   * @param velocity current velocity
   * @param angle current angle in degrees
   */
  private _getMovementVector(
    deltaTime: number,
    velocity: number,
    angle: number
  ): Vector2D {
    const time = deltaTime / 1000
    const radians = this._degreesToRadians(angle)
    const deltaX = Math.cos(radians) * time * velocity
    const deltaY = Math.sin(radians) * time * velocity

    return new Vector2D(deltaX, deltaY)
  }

  /**
   * Change degrees to radians
   *
   * @param degrees
   */
  private _degreesToRadians(degrees: number): number {
    return (degrees * Math.PI) / 180
  }
}
