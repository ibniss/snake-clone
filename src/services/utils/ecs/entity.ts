import { IAwake, IUpdate } from '/@services/utils'
import { IComponent } from './component'

type constr<T> = { new (...args: unknown[]): T }

/**
 * This is an abstract entity class - a simple container for components.
 */
export abstract class Entity implements IAwake, IUpdate {
  protected _components: IComponent[] = []

  public get components(): IComponent[] {
    return this._components
  }

  public addComponent(component: IComponent): void {
    this._components.push(component)
    component.entity = this
  }

  /**
   * Get a component of a given type.
   *
   * @param constr constructor of a component to find
   */
  public getComponent<C extends IComponent>(constr: constr<C>): C {
    const comp = this._components.find(c => c instanceof constr)

    if (comp === undefined) {
      throw new Error(
        `Component ${constr.name} not found on Entity ${this.constructor.name}`
      )
    }

    return comp as C
  }

  /**
   * Remove a component of a given type.
   *
   * @param constr constructor of a component to remove
   */
  public removeComponent<C extends IComponent>(constr: constr<C>): void {
    const comp = this._components.find(c => c instanceof constr)

    // if found, remove the connection to entity and remove component
    if (comp) {
      comp.entity = null
      this._components.splice(this._components.indexOf(comp), 1)
    }
  }

  /**
   * Check whether the entity has a component of a given type.
   *
   * @param constr constructor of a component to find
   */
  public hasComponent<C extends IComponent>(constr: constr<C>): boolean {
    return !!this._components.find(c => c instanceof constr)
  }

  /**
   * Awake the entity - calls awake for all components.
   * Called at the very start of the game loop.
   */
  public awake(): void {
    this._components.forEach(component => component.awake())
  }

  /**
   * Update the entity - calls update for all components.
   * Called during each game loop cycle.
   *
   * @param deltaTime time passed since last update
   */
  public update(deltaTime: number): void {
    this._components.forEach(component => component.update(deltaTime))
  }
}
