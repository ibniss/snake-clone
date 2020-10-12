import { Canvas } from './canvas'
import { Vector2D } from '/@services/utils'
import { Settings } from '/@services/settings'

describe('>>> Canvas', () => {
  const size = new Vector2D(100, 100)
  let canvas: Canvas
  let parent: HTMLElement

  beforeEach(() => {
    canvas = new Canvas(size, 'test')
    parent = document.createElement('div')
    parent.id = Settings.rootSelector.replace('#', '')
    document.body.append(parent)
  })

  it('should create and attach canvas to the DOM when awakens', () => {
    const createElmSpy = jest.spyOn(document, 'createElement')
    const appendChildSpy = jest.spyOn(
      document.querySelector(Settings.rootSelector)!,
      'appendChild'
    )

    expect(createElmSpy).not.toBeCalled()
    expect(appendChildSpy).not.toBeCalled()

    canvas.awake()

    expect(createElmSpy).toBeCalled()
    expect(appendChildSpy).toBeCalled()
  })

  describe('>> API', () => {
    beforeEach(() => {
      canvas.awake()
    })

    it('should draw and fill the rect', () => {
      const start = new Vector2D(0, 0)
      const size = new Vector2D(10, 10)

      const beginPathSpy = jest.spyOn(canvas.context, 'beginPath')
      const rectSpy = jest.spyOn(canvas.context, 'rect')
      const fillSpy = jest.spyOn(canvas.context, 'fill')

      canvas.fillRect(start, size, 'rgba(255, 255, 255, 1)')

      expect(beginPathSpy).toBeCalled()
      expect(rectSpy).toBeCalledWith(start.x, start.y, size.x, size.y)
      expect(fillSpy).toBeCalled()
      expect(canvas.context.fillStyle).toBe('#ffffff')
    })

    it('should clear the rect', () => {
      const start = new Vector2D(0, 0)
      const size = new Vector2D(10, 10)

      const spy = jest.spyOn(canvas.context, 'clearRect')
      expect(spy).not.toBeCalled()

      canvas.clearRect(start, size)

      expect(spy).toBeCalledWith(start.x, start.y, size.x, size.y)
    })

    it('should draw and fill the circle', () => {
      const center = new Vector2D(0, 0)
      const radius = 1

      const beginPathSpy = jest.spyOn(canvas.context, 'beginPath')
      const arcSpy = jest.spyOn(canvas.context, 'arc')
      const fillSpy = jest.spyOn(canvas.context, 'fill')

      canvas.fillCircle(center, radius, 'rgba(255, 255, 255, 1)')

      expect(beginPathSpy).toBeCalled()
      expect(arcSpy).toBeCalledWith(center.x, center.y, radius, 0, Math.PI * 2)
      expect(fillSpy).toBeCalled()
      expect(canvas.context.fillStyle).toBe('#ffffff')
    })

    it('should set css style', () => {
      const zIndex = '1'
      expect(canvas.element.style.zIndex).not.toBe<string>(zIndex)

      canvas.setStyle({ zIndex })

      expect(canvas.element.style.zIndex).toBe<string>(zIndex)
    })
  })
})
