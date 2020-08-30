import { IComponent } from '../utils'

type SquareShape = {
  type: 'square'
  side: number
}
type CircleShape = {
  type: 'circle'
  radius: number
}
type EmptySquareShape = {
  type: 'empty_square'
  side: number
  borderWidth: number
}
export type Shape = SquareShape | CircleShape | EmptySquareShape

export class ShapeComponent implements IComponent {
  name = 'shape'

  constructor(public shape: Shape = { type: 'square', side: 0 }) {}
}
