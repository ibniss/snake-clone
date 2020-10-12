import { System, Family, Engine, Entity, Vector2D } from '/@services/utils'
import {
  CollidableComponent,
  DrawableComponent,
  FoodEatenComponent,
  FrameCollisionComponent,
  PositionComponent,
} from '/@services/components'
import { Settings } from '/@services/settings'

export class FoodSystem extends System {
  private _collisionFamily: Family
  private _foodFamily: Family
  private _minFoodCount = 1

  constructor(_priority: number, _engine: Engine) {
    super(_priority, _engine)

    this._collisionFamily = new Family(
      _engine,
      [FrameCollisionComponent],
      [],
      []
    )
    this._foodFamily = new Family(_engine, [CollidableComponent], [], [])
  }

  update(): void {
    // process collisions to capture head-food colisions and add FoodEatenComponents
    this._collisionFamily.entities.forEach(entity => {
      const { collisions } = entity.getComponent(FrameCollisionComponent)

      const foodCollision = collisions.find(
        collision => collision.a === 'head' && collision.b === 'food'
      )
      if (foodCollision) {
        // add a tag to the head so we can process the score etc
        entity.addComponent(new FoodEatenComponent())

        // remove the food we collided with
        this._engine.removeEntity(
          this._engine.entities.find(e => e.id === foodCollision?.collidedWith)!
        )
      }
    })

    // if there aren't enough foods, spawn new ones
    if (
      this._foodFamily.entities.filter(
        entity => entity.getComponent(CollidableComponent).tag === 'food'
      ).length < this._minFoodCount
    ) {
      this._spawnFood()
    }
  }

  /**
   * Spawn a new food entity at a random place
   */
  private _spawnFood() {
    const food = new Entity()
    food.addComponent(
      new PositionComponent(
        new Vector2D(
          Math.random() * Settings.grid.dimension,
          Math.random() * Settings.grid.dimension
        )
      )
    )
    food.addComponent(
      new DrawableComponent({ type: 'circle', radius: 10 }, 'red')
    )
    food.addComponent(new CollidableComponent('food', []))
    this._engine.addEntity(food)
  }
}
