import { Vector2D } from '/@services/utils'
import { Tile, TileDrawComponent, mockTileFactory } from '/@services/tile'

describe('>>> Tile', () => {
  const start = new Vector2D(1, 2)
  const end = new Vector2D(5, 6)

  let tile: Tile
  beforeEach(() => {
    tile = mockTileFactory(start, end)
  })

  it('should awake and update all Components', () => {
    const spyDrawCompAwake = jest.spyOn(TileDrawComponent.prototype, 'awake')
    const spyDrawCompUpdate = jest.spyOn(TileDrawComponent.prototype, 'update')

    expect(spyDrawCompAwake).not.toBeCalled()
    expect(spyDrawCompUpdate).not.toBeCalled()

    tile.awake()
    expect(spyDrawCompAwake).toBeCalled()

    tile.update(0)
    expect(spyDrawCompUpdate).toBeCalled()
  })

  it('should calculate size', () => {
    expect(tile.size.x).toBe<number>(end.x - start.x)
    expect(tile.size.y).toBe<number>(end.y - start.y)
  })

  it('should calculate center point', () => {
    expect(tile.center.x).toBe<number>(start.x + tile.size.x / 2)
    expect(tile.center.y).toBe<number>(start.y + tile.size.y / 2)
  })
})
