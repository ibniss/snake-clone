import { TileDrawComponent } from './draw'
import { CanvasLayer } from '/@services/canvas-layer'
import { mockTileFactory } from '/@services/tile'

describe('>>> Tile Draw Component', () => {
  let comp: TileDrawComponent
  beforeEach(() => {
    comp = new TileDrawComponent(mockTileFactory())
  })

  it('should cleanup when awakens', () => {
    const spy = jest.spyOn(CanvasLayer.background, 'clearRect')
    expect(spy).not.toBeCalled()

    comp.awake()

    expect(spy).toBeCalled()
  })

  it('should cleanup and draw rect every frame', () => {
    const spyClearRect = jest.spyOn(CanvasLayer.background, 'clearRect')
    const spyFillRect = jest.spyOn(CanvasLayer.background, 'fillRect')

    expect(spyClearRect).not.toBeCalled()
    expect(spyFillRect).not.toBeCalled()

    comp.update()

    expect(spyClearRect).toBeCalled()
    expect(spyFillRect).toBeCalled()
  })
})
