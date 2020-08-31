import { Settings } from '../settings'
import { ControllableComponent, MovableComponent } from '/@services/components'
import { Engine, System, Family, Entity } from '/@services/utils'

export class InputSystem extends System {
  private _eventQueue: KeyboardEvent[] = []
  private readonly _collectKeys = ['ArrowLeft', 'KeyA', 'ArrowRight', 'KeyD']
  private _family: Family

  constructor(_priority: number, _engine: Engine) {
    super(_priority, _engine)

    this._family = new Family(
      _engine,
      [ControllableComponent, MovableComponent],
      [],
      []
    )
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
    this._family.entities.forEach(entity => {
      while (this._eventQueue.length !== 0) {
        this._handleEvent(entity, this._eventQueue.shift()!)
      }
    })
  }

  /**
   * Handle an event and apply the result to the entity
   *
   * @param entity entity to apply the event result to
   * @param event event to handle
   */
  private _handleEvent(entity: Entity, event: KeyboardEvent) {
    const movable = entity.getComponent(MovableComponent)

    switch (event.key) {
      case 'ArrowLeft':
      case 'KeyA':
        movable.angle -= Settings.movement.angleStep
        break
      case 'ArrowRight':
      case 'KeyD':
        movable.angle += Settings.movement.angleStep
        break
      default:
        throw new Error(`No handler for key ${event.key}!`)
    }
  }
}
