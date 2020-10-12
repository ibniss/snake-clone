import { IComponent } from '/@services/utils'

type SquareShape = {
  type: 'square'
  side: number
}
type CircleShape = {
  type: 'circle'
  radius: number
}

export type Shape = SquareShape | CircleShape

export class DrawableComponent implements IComponent {
  name = 'drawable'

  constructor(
    public shape: Shape = { type: 'square', side: 0 },
    public color: string = 'red'
  ) {}

  /**
   * Get minimum distance between the centres of two shapes
   */
  public get minDistance() {
    switch (this.shape.type) {
      case 'square':
        return this.shape.side / 2
      case 'circle':
        return this.shape.radius
    }
  }
}
