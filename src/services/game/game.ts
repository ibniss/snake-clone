import {
  ControllableComponent,
  EntityChainComponent,
  MovableComponent,
  PositionComponent,
  DrawableComponent,
  CollidableComponent,
} from '../components'
import { Settings } from '../settings'
import { CleanupSystem } from '../systems/cleanup'
import { DeadSystem } from '../systems/dead/dead'
import { CanvasLayer } from '../utils/canvas-layer'
import {
  InputSystem,
  RenderSystem,
  CollisionSystem,
  MoveSystem,
  FoodSystem,
} from '/@services/systems'
import {
  Entity,
  log,
  Vector2D,
  Engine,
  StatusChangeListener,
  GameStatus,
} from '/@services/utils'

/**
 * This is a class which initialises the game and runs the engine.
 */
export class Game implements StatusChangeListener {
  private _lastTimestamp = 0
  private _deltaTime = 0

  private _lastFpsUpdate = 0
  private _fps = 0
  private _framesThisSecond = 0

  private _fpsUpdateListener: Function | undefined

  public onStatusChange = (status: GameStatus): void => {}

  constructor(
    loggingEnabled: boolean = false,
    private _engine: Engine = new Engine()
  ) {
    Settings.logsEnabled = loggingEnabled
    log('Constructing game...')
    this._setupEngine(_engine)
    this._setupEntities()
  }

  /**
   * Setup the engine and the systems
   */
  private _setupEngine(engine: Engine) {
    this._engine = engine
    this._engine.addStatusChangeListener(this)
    this._engine.addSystem(new InputSystem(0, this._engine), 'input')
    this._engine.addSystem(new MoveSystem(1, this._engine), 'other')
    this._engine.addSystem(new CollisionSystem(2, this._engine), 'other')
    this._engine.addSystem(new DeadSystem(3, this._engine), 'other')
    this._engine.addSystem(new FoodSystem(4, this._engine), 'other')
    this._engine.addSystem(new CleanupSystem(5, this._engine), 'other')
    this._engine.addSystem(new RenderSystem(0, this._engine), 'render')
  }

  /**
   * Setup entities required for the initial game state
   */
  private _setupEntities() {
    const chainPositions = []
    for (let i = 1; i <= 10; i++) {
      const chainEntity = new Entity()
      const chainPosition = new PositionComponent(
        new Vector2D(100 - 10 * i, 200)
      )
      chainEntity.addComponent(chainPosition)
      chainPositions.push(chainPosition)
      chainEntity.addComponent(
        new DrawableComponent({ type: 'circle', radius: 10 })
      )
      if (i > 2) {
        chainEntity.addComponent(new CollidableComponent('body', []))
      }
      this._engine.addEntity(chainEntity)
    }

    const testEntity = new Entity()
    const position = new PositionComponent(new Vector2D(100, 200))
    testEntity.addComponent(position)
    testEntity.addComponent(
      new DrawableComponent({ type: 'circle', radius: 10 })
    )
    testEntity.addComponent(new MovableComponent(120, 0))
    testEntity.addComponent(new EntityChainComponent(chainPositions))
    testEntity.addComponent(new ControllableComponent())
    testEntity.addComponent(
      new CollidableComponent('head', ['body', 'border', 'food'])
    )
    this._engine.addEntity(testEntity)
  }

  /**
   * Set a function as FPS listener
   *
   * @param func function to call when FPS changes
   */
  public setOnFpsUpdate(func: Function) {
    this._fpsUpdateListener = func
  }

  /**
   * Set a function as status change listener
   *
   * @param func function to call when status changes
   */
  public setOnStatusUpdate(func: (status: GameStatus) => void) {
    this.onStatusChange = func
  }

  /**
   * Restarts the game
   */
  public restart(): void {
    CanvasLayer.destroy()
    this._setupEngine(new Engine())
    this._setupEntities()
    this.prepare()
    this.start()
  }

  /**
   * Prepare the game - awake the engine
   */
  public prepare(): void {
    log('Preparing engine...')
    this._engine.awake()
  }

  /**
   * Start the game - awake the engine and start game loop.
   */
  public start(): void {
    log('Starting engine...')
    window.requestAnimationFrame(num => this.run(num))
  }

  /**
   * The game loop
   */
  private run(timestamp: DOMHighResTimeStamp): void {
    if (this._engine.status === 'lost') {
      return
    }

    // Throttle frame rate
    if (timestamp < this._lastTimestamp + Settings.timestep) {
      window.requestAnimationFrame(num => this.run(num))
      return
    }

    this._deltaTime += timestamp - this._lastTimestamp
    this._lastTimestamp = timestamp

    // update FPS
    if (timestamp > this._lastFpsUpdate + 1000) {
      this.updateFps(0.25 * this._framesThisSecond + 0.85 * this._fps)

      this._lastFpsUpdate = timestamp
      this._framesThisSecond = 0
    }
    this._framesThisSecond++

    // PROCESS INPUT
    this._engine.processInput()

    // UPDATE
    let updateStepsCount = 0
    while (this._deltaTime >= Settings.timestep) {
      this._engine.update(Settings.timestep)
      this._deltaTime -= Settings.timestep

      // panic safety guard
      if (++updateStepsCount >= Settings.maxUpdates) {
        this._deltaTime = 0
        break
      }
    }

    // RENDER
    this._engine.render()

    window.requestAnimationFrame(num => this.run(num))
  }

  /**
   * Update current FPS
   *
   * @param fps fps to set
   */
  private updateFps(fps: number) {
    this._fps = fps
    this._fpsUpdateListener?.(fps)
  }
}
