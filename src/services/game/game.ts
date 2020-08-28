import Grid from '../grid/grid'
import { Entity } from '/@services/utils'

export class Game extends Entity {
  private _lastTimestamp = 0

  private _entities: Entity[] = []

  public get entities(): Entity[] {
    return this._entities
  }

  public awake(): void {
    super.awake()

    // instantiate grid, add initial entities
    const grid = new Grid()
    this._entities.push(grid)

    // awake all children
    this.entities.forEach(e => e.awake())

    // start update loop
    window.requestAnimationFrame(() => {
      this._lastTimestamp = Date.now()
      this.update()
    })
  }

  public update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000

    // update all components
    super.update(deltaTime)

    // update all children
    this.entities.forEach(e => e.update(deltaTime))

    // update timestamp
    this._lastTimestamp = Date.now()

    // invoke next frame
    window.requestAnimationFrame(() => this.update())
  }
}
