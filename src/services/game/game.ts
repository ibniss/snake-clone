import {
  ControllableComponent,
  EntityChainComponent,
  MovableComponent,
  PositionComponent,
  DrawableComponent,
  CollidableComponent,
} from '../components'
import { Settings } from '../settings'
import {
  InputSystem,
  RenderSystem,
  CollisionSystem,
  MoveSystem,
} from '/@services/systems'
import { Entity, log, Vector2D, Engine } from '/@services/utils'

/**
 * This is a class which initialises the game and runs the engine.
 */
export class Game {
  private _lastTimestamp = 0
  private _deltaTime = 0

  private _lastFpsUpdate = 0
  private _fps = 0
  private _framesThisSecond = 0

  private _fpsUpdateListener: Function | undefined

  constructor(
    loggingEnabled: boolean = false,
    private _engine: Engine = new Engine()
  ) {
    Settings.logsEnabled = loggingEnabled
    log('Constructing game...')
    _engine.addSystem(new InputSystem(0, _engine), 'input')
    _engine.addSystem(new MoveSystem(1, _engine), 'other')
    _engine.addSystem(new CollisionSystem(2, _engine), 'other')
    _engine.addSystem(new RenderSystem(0, _engine), 'render')

    // Add the border as an entity
    const borderEntity = new Entity()
    const size = Settings.grid.dimension
    borderEntity.addComponent(
      new PositionComponent(new Vector2D(size / 2, size / 2))
    )
    borderEntity.addComponent(
      new DrawableComponent(
        {
          type: 'empty_square',
          side: size,
          borderWidth: Settings.grid.borderWidth,
        },
        Settings.grid.borderColor
      )
    )
    _engine.addEntity(borderEntity)

    const chainPositions = []
    for (let i = 1; i <= 5; i++) {
      const chainEntity = new Entity()
      const chainPosition = new PositionComponent(
        new Vector2D(100 - 10 * i, 200)
      )
      chainEntity.addComponent(chainPosition)
      chainPositions.push(chainPosition)
      chainEntity.addComponent(
        new DrawableComponent({ type: 'circle', radius: 10 })
      )
      _engine.addEntity(chainEntity)
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
    testEntity.addComponent(new CollidableComponent('head', ['food', 'border']))
    _engine.addEntity(testEntity)

    const testEntity2 = new Entity()
    testEntity2.addComponent(new PositionComponent(new Vector2D(200, 200)))
    testEntity2.addComponent(
      new DrawableComponent({ type: 'circle', radius: 10 })
    )
    testEntity2.addComponent(new CollidableComponent('food', []))
    _engine.addEntity(testEntity2)
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
   * Start the game - awake the engine and start game loop.
   */
  public start() {
    log('Starting engine...')
    this._engine.awake()
    window.requestAnimationFrame(num => this.run(num))
  }

  /**
   * The game loop
   */
  private run(timestamp: DOMHighResTimeStamp): void {
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
