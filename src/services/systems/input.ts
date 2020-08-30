import { ControllableComponent } from '/@services/components'
import { Engine, System, Family } from '/@services/utils'

export class InputSystem extends System {
  private _eventQueue: KeyboardEvent[] = []
  private readonly _collectKeys = ['ArrowLeft', 'KeyA', 'ArrowRight', 'KeyD']
  private _family: Family

  constructor(_priority: number, _engine: Engine) {
    super(_priority, _engine)

    this._family = new Family(_engine, [ControllableComponent], [], [])
  }

  /**
   * Register event listeners
   */
  awake(): void {
    document.addEventListener('keydown', event => {
      if (this._collectKeys.includes(event.key)) {
        this._eventQueue.push(event)
      }
    })
  }

  /**
   * Process all events in the input queue
   */
  update(): void {
    let currentEvent: KeyboardEvent | undefined

    // TODO: process the event queue
  }
}
