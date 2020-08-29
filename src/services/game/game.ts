import {
  ColorComponent,
  PositionComponent,
  Shape,
  ShapeComponent,
} from '../components'
import { Settings } from '../settings'
import { RenderSystem } from '../systems/render'
import { Entity, log, Vector2D, Engine } from '/@services/utils'

/**
 * This is a class which initialises the game and runs the engine.
 */
export class Game {
  private _lastTimestamp = 0

  constructor(
    loggingEnabled: boolean = false,
    private _engine: Engine = new Engine()
  ) {
    Settings.logsEnabled = loggingEnabled
    log('Constructing game...')
    _engine.addSystem(new RenderSystem(0, _engine))

    const testEntity = new Entity()
    testEntity.addComponent(new PositionComponent(new Vector2D(100, 100)))
    testEntity.addComponent(new ShapeComponent(Shape.CIRCLE, 10))
    testEntity.addComponent(new ColorComponent('rgba(240, 60, 50, 0)'))
    _engine.addEntity(testEntity)
  }

  /**
   * Start the game - awake the engine and start game loop.
   */
  public start() {
    log('Starting engine...')
    this._engine.awake()
    this._lastTimestamp = Date.now()
    this.run()
  }

  /**
   * The game loop
   */
  private run() {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000
    this._engine.update(deltaTime)
    window.requestAnimationFrame(() => this.run())
  }
}
