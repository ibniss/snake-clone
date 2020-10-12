import { FoodEatenComponent } from '../components'
import { System, Family, Engine } from '/@services/utils'

export class ScoreSystem extends System {
  private _family: Family
  private _score: number = 0

  constructor(_priority: number, _engine: Engine) {
    super(_priority, _engine)

    this._family = new Family(_engine, [], [FoodEatenComponent], [])
  }

  update(): void {
    this._family.entities.forEach(entity => {
      const { food } = entity.getComponent(FoodEatenComponent)

      // TODO: event queue for score? + tests for untested systems
      this._score++
      this._engine.removeEntity(food)
    })
  }
}
