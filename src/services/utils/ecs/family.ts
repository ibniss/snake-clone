import { Engine, EngineEntityListener } from '../engine'
import { IComponent, Entity } from '/@services/utils'

type Constructor<T extends IComponent> = new (...args: any[]) => T

export class Family implements EngineEntityListener {
  private _needsRefresh: boolean
  private _entities: Entity[]

  constructor(
    private readonly _engine: Engine,
    private all: Constructor<IComponent>[], // all of these
    private one: Constructor<IComponent>[], // at least one of these
    private none: Constructor<IComponent>[] // none of these
  ) {
    this._entities = this._engine.entities.filter(e => this.matches(e))
    this._engine.addEntityListener(this)
    this._needsRefresh = false
  }

  /**
   * When an entity gets added, if it wasn't included in the family,
   * add it to the cache and mark needsRefresh as true.
   *
   * @param entity entity that was added to the engine
   */
  onEntityAdded(entity: Entity): void {
    if (!this._entities.includes(entity)) {
      this._entities.push(entity)
      this._needsRefresh = true
      entity.addListener(this.onEntityChanged)
    }
  }

  /**
   * When an entity gets removed, if it was included in the family,
   * remove it from the cache.
   *
   * @param entity entity that was removed
   */
  onEntityRemoved(entity: Entity): void {
    const index = this._entities.indexOf(entity)

    if (index !== -1) {
      entity.removeListener(this.onEntityChanged)
      this._entities.splice(index, 1)
    }
  }

  /**
   * When an entity changes, if it wasn't included in the cache add it
   * and attach the listener. Mark needsRefresh as true
   *
   * @param entity entity that changed
   */
  onEntityChanged(entity: Entity): void {
    if (!this._entities.includes(entity)) {
      this._entities.push(entity)
      entity.addListener(this.onEntityChanged)
    }
    this._needsRefresh = true
  }

  /**
   * Check whether a given entity matches all contraints of this family.
   *
   * @param entity entity to check
   */
  public matches<T extends Entity>(entity: T) {
    const entityComponents = entity.components.map(
      (c: IComponent) => c.constructor as Constructor<IComponent>
    )
    const allPassed = this.all.every(c => entityComponents.includes(c))
    const onePassed =
      !this.one.length || this.one.some(c => entityComponents.includes(c))
    const nonePassed = entityComponents.every(c => !this.none.includes(c))
    return allPassed && onePassed && nonePassed
  }

  /**
   * Get all entities in the game that match the family.
   */
  public get entities() {
    // refresh entities if needed
    if (this._needsRefresh) {
      this._needsRefresh = false
      this._entities = this._entities.filter(e => this.matches(e))
    }

    return this._entities.slice(0)
  }
}
