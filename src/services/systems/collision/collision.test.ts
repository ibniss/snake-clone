import { CollisionSystem } from './collision'
import {
  CollidableComponent,
  DrawableComponent,
  FrameCollisionComponent,
  MovableComponent,
  PositionComponent,
} from '/@services/components'
import { Entity, Engine, Vector2D } from '/@services/utils'

// using 1000ms timestep for easier calculation
const time = 1
const timestep = time * 1000

describe('>>> Collision system', () => {
  let entity: Entity
  let system: CollisionSystem
  let engine: Engine

  beforeEach(() => {
    engine = new Engine()

    entity = new Entity()
    entity.addComponent(new CollidableComponent('head', ['body']))
    entity.addComponent(new DrawableComponent({ type: 'circle', radius: 10 }))
    entity.addComponent(new PositionComponent(new Vector2D(100, 100)))
    entity.addComponent(new MovableComponent(10, 0))

    system = new CollisionSystem(0, engine)
    engine.addSystem(system, 'other')
    engine.addEntity(entity)
  })

  it('adds FrameCollisionComponent to entity when collides with another valid entity', () => {
    const anotherEntity = new Entity()
    anotherEntity.addComponent(new CollidableComponent('body', []))
    anotherEntity.addComponent(
      new DrawableComponent({ type: 'circle', radius: 10 })
    )
    anotherEntity.addComponent(new PositionComponent(new Vector2D(105, 100)))
    engine.addEntity(anotherEntity)

    expect(entity.hasComponent(FrameCollisionComponent)).toBe(false)

    engine.update(timestep)

    expect(entity.hasComponent(FrameCollisionComponent)).toBe(true)
    expect(entity.getComponent(FrameCollisionComponent).collisions).toEqual([
      {
        a: 'head',
        b: 'body',
      },
    ])
  })

  it('adds multiple collisiont to FrameCollisionComponent on subsequent collisions', () => {
    const anotherEntity = new Entity()
    anotherEntity.addComponent(new CollidableComponent('body', []))
    anotherEntity.addComponent(
      new DrawableComponent({ type: 'circle', radius: 10 })
    )
    anotherEntity.addComponent(new PositionComponent(new Vector2D(105, 100)))
    engine.addEntity(anotherEntity)

    expect(entity.hasComponent(FrameCollisionComponent)).toBe(false)

    engine.update(timestep)
    engine.update(timestep)

    expect(entity.hasComponent(FrameCollisionComponent)).toBe(true)
    expect(entity.getComponent(FrameCollisionComponent).collisions).toEqual([
      {
        a: 'head',
        b: 'body',
      },
      {
        a: 'head',
        b: 'body',
      },
    ])
  })

  it("doesn't add FrameCollisionComponent to entity when doesn't collide with another valid entity", () => {
    const anotherEntity = new Entity()
    anotherEntity.addComponent(new CollidableComponent('body', []))
    anotherEntity.addComponent(
      new DrawableComponent({ type: 'circle', radius: 10 })
    )
    anotherEntity.addComponent(new PositionComponent(new Vector2D(125, 100)))
    engine.addEntity(anotherEntity)

    expect(entity.hasComponent(FrameCollisionComponent)).toBe(false)

    engine.update(timestep)

    expect(entity.hasComponent(FrameCollisionComponent)).toBe(false)
  })

  it("doesn't add FrameCollisionComponent to entity when collides with another invalid entity", () => {
    const anotherEntity = new Entity()
    anotherEntity.addComponent(new CollidableComponent('food', []))
    anotherEntity.addComponent(
      new DrawableComponent({ type: 'circle', radius: 10 })
    )
    anotherEntity.addComponent(new PositionComponent(new Vector2D(105, 100)))
    engine.addEntity(anotherEntity)

    expect(entity.hasComponent(FrameCollisionComponent)).toBe(false)

    engine.update(timestep)

    expect(entity.hasComponent(FrameCollisionComponent)).toBe(false)
  })
})
