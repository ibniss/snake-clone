import { CanvasLayer } from './canvas-layer'
import { Canvas } from '/@services/utils'

jest.mock('/@services/utils')
describe('>>> CanvasLayer', () => {
  it('should create Background canvas only once', () => {
    expect(Canvas).not.toBeCalled()

    const canvas1 = CanvasLayer.background
    const canvas2 = CanvasLayer.background

    expect(canvas1).toBe(canvas2)
    expect(Canvas).toBeCalledTimes(1)
  })

  it('should create Foreground canvas only once', () => {
    expect(Canvas).not.toBeCalled()

    const canvas1 = CanvasLayer.foreground
    const canvas2 = CanvasLayer.foreground

    expect(canvas1).toBe(canvas2)
    expect(Canvas).toBeCalledTimes(1)
  })
})
