import { Vector2D, Canvas } from '/@services/utils'
import { Settings } from '/@services/settings'

/**
 * A static helper for drawing shapes on the canvas
 */
export class CanvasLayer {
  private static _background: Canvas | undefined
  private static _foreground: Canvas | undefined

  // prohibit object creation - essentially a singleton
  private constructor() {}

  public static get background(): Canvas {
    if (!this._background) {
      this._background = this.initCanvas({ zIndex: '0' }, 'background')
    }

    return this._background
  }

  public static get foreground(): Canvas {
    if (!this._foreground) {
      this._foreground = this.initCanvas({ zIndex: '1' }, 'foreground')
    }

    return this._foreground
  }

  private static initCanvas(
    style: Partial<CSSStyleDeclaration>,
    id: string
  ): Canvas {
    const size = Settings.grid.dimension
    const canvas = new Canvas(new Vector2D(size, size), id)
    canvas.awake()
    canvas.setStyle(style)

    return canvas
  }

  /**
   * Destroy the canvas layers.
   */
  public static destroy() {
    const background = document.getElementById('background')
    const foreground = document.getElementById('foreground')
    background?.remove()
    foreground?.remove()

    this._foreground = undefined
    this._background = undefined
  }
}
