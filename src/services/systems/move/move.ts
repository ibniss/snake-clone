import {
  MovableComponent,
  PositionComponent,
  EntityChainComponent,
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
      const newPosition = this._moveEntity(deltaTime, entity)

      // if entity has a chain of other components, update their positions too
      if (entity.hasComponent(EntityChainComponent)) {
        let moveTo = newPosition
        const { positionComponents } = entity.getComponent(EntityChainComponent)
        const { velocity } = entity.getComponent(MovableComponent)

        positionComponents.forEach(comp => {
          moveTo = this._moveTowards(deltaTime, velocity, comp, moveTo)
        })
      }
    })
  }

  /**
   * Move a given entity according to its velocity and angle
   *
   * @param deltaTime time elapsed in ms
   * @param entity entity to update position of
   * @returns new position of the entity
   */
  private _moveEntity(deltaTime: number, entity: Entity): Vector2D {
    const { velocity, angle } = entity.getComponent(MovableComponent)

    const deltaVector = this._getMovementVector(deltaTime, velocity, angle)
    const newPosition = entity
      .getComponent(PositionComponent)
      .position.add(deltaVector)

    return newPosition
  }

  /**
   * Move a given component towards a point with a given velocity
   *
   * @param deltaTime time elapsed in ms
   * @param component position component to apply the movement to
   * @param moveTo position to move towards
   * @returns new position of the moved component
   */
  private _moveTowards(
    deltaTime: number,
    velocity: number,
    component: PositionComponent,
    moveTo: Vector2D
  ): Vector2D {
    // get the angle between the vector x->y and x axis
    const angle =
      (Math.atan2(
        moveTo.y - component.position.y,
        moveTo.x - component.position.x
      ) *
        180) /
      Math.PI
    return component.position.add(
      this._getMovementVector(deltaTime, velocity, angle)
    )
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
    const deltaX = Math.cos((angle * Math.PI) / 180) * time * velocity
    const deltaY = Math.sin((angle * Math.PI) / 180) * time * velocity

    return new Vector2D(deltaX, deltaY)
  }
}
