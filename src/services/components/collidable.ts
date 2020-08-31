import { IComponent } from '/@services/utils'

export type CollideTag = 'head' | 'body' | 'border' | 'food'

export class CollidableComponent implements IComponent {
  name = 'collidable'

  constructor(public tag: CollideTag, public collidesWith: CollideTag[] = []) {}
}
