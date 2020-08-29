import { Engine } from '../engine'
import { IUpdate } from '/@services/utils'

/**
 * System is a place for logic to live and update entities.
 *
 * E.g. MovementSystem which updates position of the entities
 *
 * The subclasses can have families to restrict which entities are
 * getting processed by a given system
 */
export abstract class System implements IUpdate {
  constructor(private _priority: number, private readonly _engine: Engine) {}

  public get priority() {
    return this._priority
  }

  public set priority(value: number) {
    this._priority = value
    this._engine.notifyPriorityChange()
  }

  /**
   * Initialise the system - not required
   */
  awake(): void {}

  /**
   * Update the relevant entities - required to implement
   *
   * @param deltaTime time passed since last update
   */
  abstract update(deltaTime: number): void
}
