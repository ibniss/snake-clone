import { Entity, IUpdate, IAwake, System, log } from '/@services/utils'

export type GameStatus = 'not running' | 'running' | 'lost'

export interface EngineEntityListener {
  onEntityAdded(entity: Entity): void
  onEntityRemoved(entity: Entity): void
}

export interface StatusChangeListener {
  onStatusChange(status: GameStatus): void
}

export class Engine implements IAwake, IUpdate {
  private _systemsNeedSorting: boolean = false

  private _entities: Entity[] = []
  private _entityListeners: EngineEntityListener[] = []

  private _inputSystem: System | undefined
  private _systems: System[] = []
  private _renderSystem: System | undefined

  private _status: GameStatus = 'not running'
  private _statusChangeListener: StatusChangeListener | undefined = undefined

  public get status() {
    return this._status
  }

  /**
   * Add a listener for when game status changes
   *
   * @param listener listener to add
   */
  addStatusChangeListener(listener: StatusChangeListener) {
    this._statusChangeListener = listener
    return this
  }

  /**
   * Adds a listener for when entities are added or removed.
   * @param listener The listener waiting to add
   */
  addEntityListener(listener: EngineEntityListener) {
    if (!this._entityListeners.includes(listener)) {
      log('Engine registering entity listener:', listener.constructor.name)
      this._entityListeners.push(listener)
    }
    return this
  }

  /**
   * Removes a listener from the entity listener list.
   * @param listener The listener to remove
   */
  removeEntityListener(listener: EngineEntityListener) {
    const index = this._entityListeners.indexOf(listener)
    if (index !== -1) {
      this._entityListeners.splice(index, 1)
    }
    return this
  }

  public get entities(): Entity[] {
    return this._entities.slice(0)
  }

  /**
   * Add an entity to the engine if it's not already added
   *
   * @param entity entity to add
   */
  public addEntity(entity: Entity) {
    if (!this._entities.includes(entity)) {
      this._entities.push(entity)
      this._entityListeners.forEach(listener => listener.onEntityAdded(entity))
    }

    return this
  }

  /**
   * Add a list of entities to the engine
   *
   * @param entities entities to add
   */
  addEntities(...entities: Entity[]) {
    entities.forEach(e => this.addEntity(e))
    return this
  }

  /**
   * Remove a given entity from the engine
   *
   * @param entity entity to remove
   */
  removeEntity(entity: Entity) {
    const index = this._entities.indexOf(entity)

    if (index !== -1) {
      this._entities.splice(index, 1)
      this._entityListeners.forEach(listener =>
        listener.onEntityRemoved(entity)
      )
    }
  }

  /**
   * Add a given system to the engine
   *
   * @param system system to add
   */
  addSystem(system: System, type: 'input' | 'render' | 'other') {
    switch (type) {
      case 'input': {
        log('Adding input system:', system.constructor.name)
        this._inputSystem = system
        break
      }
      case 'render': {
        log('Adding render system:', system.constructor.name)
        this._renderSystem = system
        break
      }
      case 'other': {
        if (!this._systems.includes(system)) {
          log('Adding other system:', system.constructor.name)
          this._systems.push(system)
          this._systemsNeedSorting = true
        }
        break
      }
    }

    return this
  }

  /**
   * Remove a given system from the engine
   *
   * @param system system to remove
   */
  removeSystem(system: System) {
    const index = this._systems.indexOf(system)

    if (index !== -1) {
      this._systems.splice(index, 1)
    }
  }

  /**
   * Notifies the engine that it needs to sort the systems by priority
   */
  public notifyPriorityChange() {
    this._systemsNeedSorting = true
  }

  /**
   * Change the game status. Invokes the handler
   *
   * @param status new status to set
   */
  public changeStatus(status: GameStatus) {
    this._status = status
    this._statusChangeListener?.onStatusChange(status)
  }

  /**
   * Initialise all the sytems
   */
  public awake(): void {
    this.sortSystemsIfRequired()
    this._inputSystem?.awake()
    this._systems.forEach(s => s.awake())
    this._renderSystem?.awake()
    this.changeStatus('running')
  }

  /**
   * Call the input processing system.
   */
  public processInput(): void {
    this._inputSystem?.update()
  }

  /**
   * Update all other systems added to the engine
   *
   * @param deltaTime time elapsed since last update
   */
  public update(deltaTime: number): void {
    this.sortSystemsIfRequired()
    this._systems.forEach(s => s.update(deltaTime))
  }

  /**
   * Call the rendering system.
   */
  public render(): void {
    this._renderSystem?.update()
  }

  /**
   * Checks if systems need sorting and sorts if that's true
   */
  private sortSystemsIfRequired() {
    if (this._systemsNeedSorting) {
      this._systemsNeedSorting = false
      this._systems.sort((a, b) => a.priority - b.priority)
    }
  }
}
