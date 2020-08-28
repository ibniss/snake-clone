import { Vector2D, Canvas } from '/@services/utils'

export class CanvasLayer {
  private static _background: Canvas
  private static _foreground: Canvas

  // prohibit object creation - essentially a singleton
  private constructor() {}

  public static get background(): Canvas {
    if (!this._background) {
      this._background = this.initCanvas({ zIndex: '0' })
    }

    return this._background
  }

  public static get foreground(): Canvas {
    if (!this._foreground) {
      this._foreground = this.initCanvas({ zIndex: '0' })
    }

    return this._foreground
  }

  private static initCanvas(style: Partial<CSSStyleDeclaration>): Canvas {
    const size = 9 // TODO: get from settings
    const canvas = new Canvas(new Vector2D(size, size))
    canvas.awake()
    canvas.setStyle(style)

    return canvas
  }
}
