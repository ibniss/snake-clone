import { IAwake, Vector2D } from '/@services/utils'
import { Settings } from '/@services/settings'

export class Canvas implements IAwake {
  private _elm: HTMLCanvasElement | undefined
  private _ctx: CanvasRenderingContext2D | undefined

  public get element(): HTMLCanvasElement {
    if (!this._elm) {
      throw new Error("Trying to access canvas element before it's initialised")
    }

    return this._elm
  }

  public get context(): CanvasRenderingContext2D {
    if (!this._ctx) {
      throw new Error("Trying to access canvas context before it's initialised")
    }

    return this._ctx
  }

  constructor(public readonly size: Vector2D, private readonly _id: string) {}

  public awake(): void {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('id', this._id)
    canvas.setAttribute('width', `${this.size.x}px`)
    canvas.setAttribute('height', `${this.size.y}px`)
    document.querySelector(Settings.rootSelector)?.appendChild(canvas)
    this._elm = canvas

    const ctx = this._elm.getContext('2d')

    if (!ctx) {
      throw new Error('Context identifier not supported')
    }

    this._ctx = ctx
  }

  // Helper methods

  public fillRect(start: Vector2D, size: Vector2D, color: string): void {
    this.context.beginPath()
    this.context.fillStyle = color
    this.context.rect(start.x, start.y, size.x, size.y)
    this.context.fill()
  }

  public drawRect(
    start: Vector2D,
    size: Vector2D,
    color: string,
    strokeWidth: number
  ): void {
    const previousWidth = this.context.lineWidth
    this.context.lineWidth = strokeWidth
    this.context.beginPath()
    this.context.strokeStyle = color
    this.context.rect(start.x, start.y, size.x, size.y)
    this.context.stroke()
    this.context.lineWidth = previousWidth
  }

  public fillCircle(center: Vector2D, radius: number, color: string): void {
    this.context.beginPath()
    this.context.arc(center.x, center.y, radius, 0, Math.PI * 2)
    this.context.fillStyle = color
    this.context.fill()
  }

  public clearRect(start: Vector2D, size: Vector2D): void {
    this.context.clearRect(start.x, start.y, size.x, size.y)
  }

  public setStyle(style: Partial<CSSStyleDeclaration>): void {
    for (const key in style) {
      if (!Object.hasOwnProperty.call(style, key)) {
        continue
      }

      if (!style[key]) {
        continue
      }

      this.element.style[key] = style[key] as string
    }
  }
}
