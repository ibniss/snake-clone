import { FoodEatenComponent } from '/@services/components'
import { System, Family, Engine } from '/@services/utils'

export class ScoreSystem extends System {
  private _family: Family

  constructor(_priotity: number, _engine: Engine) {
    super(_priotity, _engine)

    this._family = new Family(_engine, [FoodEatenComponent], [], [])
  }

  update(): void {
    this._family.entities.forEach(() => {
      this._engine.incrementScore()
    })
  }
}
