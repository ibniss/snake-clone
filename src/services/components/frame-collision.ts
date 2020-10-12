import { IComponent } from '../utils'
import { CollideTag } from './collidable'

export type Collision = {
  a: CollideTag
  b: CollideTag
  collidedWith: number // store the ID of the collided entity in case we need to look it up
}

export class FrameCollisionComponent implements IComponent {
  name = 'frame-collision'

  constructor(public collisions: Collision[] = []) {}
}
