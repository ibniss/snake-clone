import { FrameCollisionComponent } from '/@services/components'
import { Engine, Family, System } from '/@services/utils'

export class DeadSystem extends System {
  private _family: Family

  constructor(_priority: number, _engine: Engine) {
    super(_priority, _engine)

    this._family = new Family(_engine, [FrameCollisionComponent], [], [])
  }

  update(): void {
    this._family.entities.forEach(entity => {
      const { collisions } = entity.getComponent(FrameCollisionComponent)

      const isDead = collisions.some(
        collision => collision.a === 'head' && collision.b === 'border'
      )
      if (isDead) {
        this._engine.changeStatus('lost')
      }
    })
  }
}
