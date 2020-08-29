import { IComponent, Vector2D } from '/@services/utils'

export class PositionComponent implements IComponent {
  name = 'position'

  constructor(public position: Vector2D) {}
}
