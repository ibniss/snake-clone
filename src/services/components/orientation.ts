import { IComponent } from '../utils'

export enum Orientation {
  UP = '⬆',
  DOWN = '⬇',
  LEFT = '⬅',
  RIGHT = '➡',
}

export class OrientationComponent implements IComponent {
  name = 'orientation'
  constructor(public orientation: Orientation = Orientation.UP) {}
}
