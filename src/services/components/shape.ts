import { IComponent } from '../utils'

export enum Shape {
  SQUARE,
  CIRCLE,
}

export class ShapeComponent implements IComponent {
  name = 'shape'

  constructor(public shape: Shape = Shape.SQUARE, public size: number = 0) {}
}
