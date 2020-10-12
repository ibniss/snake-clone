import {
  FoodEatenComponent,
  FrameCollisionComponent,
} from '/@services/components'
import {
  Engine,
  Family,
  Constructor,
  System,
  IComponent,
} from '/@services/utils'

export class CleanupSystem extends System {
  private _family: Family
  // at the end of each update cycle remove these components from entities
  private readonly _cleanUpComponents: Constructor<IComponent>[] = [
    FrameCollisionComponent,
    FoodEatenComponent,
  ]

  constructor(_priority: number, _engine: Engine) {
    super(_priority, _engine)

    this._family = new Family(_engine, [], this._cleanUpComponents, [])
  }

  /**
   * Remove components from entities
   */
  update(): void {
    this._family.entities.forEach(entity => {
      this._cleanUpComponents.forEach(comp => {
        entity.removeComponent(comp)
      })
    })
  }
}
