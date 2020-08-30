import { IComponent } from '../utils'

export class MovableComponent implements IComponent {
  name = 'movable'

  constructor(public velocity: number = 0, public angle: number = 0) {}
}
