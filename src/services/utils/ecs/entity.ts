import { IComponent } from './component'

type Constructor<T extends IComponent> = new (...args: any[]) => T
type EntityChangeListener = (entity: Entity) => any

/**
 * This is the entity class - a simple container for components, a 'bag of components'.
 * The entity is described by the components in it
 */
export class Entity {
  private _components: IComponent[] = []
  private _listeners: EntityChangeListener[] = []

  public id: number
  public static nextId = 1

  constructor() {
    this.id = Entity.nextId++
  }

  public get components(): IComponent[] {
    return this._components
  }

  public addComponent(component: IComponent): void {
    this._components.push(component)
    this._listeners.forEach(l => l(this))
  }

  /**
   * Get a component of a given type.
   *
   * @param constr constructor of a component to find
   */
  public getComponent<C extends IComponent>(constr: Constructor<C>): C {
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
  public removeComponent<C extends IComponent>(constr: Constructor<C>): void {
    const comp = this._components.find(c => c instanceof constr)

    // if found, remove the connection to entity and remove component
    if (comp) {
      this._components.splice(this._components.indexOf(comp), 1)
      this._listeners.forEach(l => l(this))
    }
  }

  /**
   * Check whether the entity has a component of a given type.
   *
   * @param constr constructor of a component to find
   */
  public hasComponent<C extends IComponent>(constr: Constructor<C>): boolean {
    return !!this._components.find(c => c instanceof constr)
  }

  /**
   * Adds a listener to the entity when components are added or removed.
   *
   * @param listener The listener to add
   */
  addListener(listener: EntityChangeListener) {
    const index = this._listeners.indexOf(listener)
    if (index === -1) {
      this._listeners.push(listener)
    }
    return this
  }

  /**
   * Removes a listener from the entity.
   *
   * @param listener The listener to remove.
   */
  removeListener(listener: EntityChangeListener) {
    const index = this._listeners.indexOf(listener)
    if (index !== -1) {
      this._listeners.splice(index, 1)
    }
    return this
  }
}
