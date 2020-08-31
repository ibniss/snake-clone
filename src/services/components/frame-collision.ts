import { IComponent } from '../utils'
import { CollideTag } from './collidable'

export type Collision = {
  a: CollideTag
  b: CollideTag
}

export class FrameCollisionComponent implements IComponent {
  name = 'frame-collision'

  constructor(public collisions: Collision[] = []) {}
}
