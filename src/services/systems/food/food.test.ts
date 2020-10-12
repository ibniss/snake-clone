import { FoodSystem } from './food'
import {
  FrameCollisionComponent,
  FoodEatenComponent,
} from '/@services/components'
import { Entity, Engine } from '/@services/utils'

// using 1000ms timestep for easier calculation
const time = 1
const timestep = time * 1000

describe('>>> Collision system', () => {
  let entity: Entity
  let system: FoodSystem
  let engine: Engine

  beforeEach(() => {
    engine = new Engine()
    entity = new Entity()

    system = new FoodSystem(0, engine)
    engine.addSystem(system, 'other')
    engine.addEntity(entity)
  })

  it('adds FoodEatenComponent when head collides with food', () => {
    engine.awake()
    expect(entity.hasComponent(FoodEatenComponent)).toBeFalse()
    entity.addComponent(new FrameCollisionComponent([{ a: 'head', b: 'food' }]))

    engine.update(timestep)

    expect(entity.hasComponent(FoodEatenComponent)).toBe(true)
  })

  it('does not add FoodEatenComponent when head collides with not food', () => {
    engine.awake()
    expect(entity.hasComponent(FoodEatenComponent)).toBeFalse()
    entity.addComponent(
      new FrameCollisionComponent([{ a: 'head', b: 'border' }])
    )

    engine.update(timestep)

    expect(entity.hasComponent(FoodEatenComponent)).toBe(false)
  })
})
