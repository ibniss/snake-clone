import { FrameCollisionComponent } from '/@services/components'
import {
  Engine,
  Family,
  Constructor,
  System,
  IComponent,
} from '/@services/utils'

export class CleanupSystem extends System {
  private _family: Family
  private readonly _cleanUpComponents: Constructor<IComponent>[] = [
    FrameCollisionComponent,
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
