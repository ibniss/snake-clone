import { CleanupSystem } from './cleanup'
import { FrameCollisionComponent } from '/@services/components'
import { Entity, Engine } from '/@services/utils'

// using 1000ms timestep for easier calculation
const time = 1
const timestep = time * 1000

describe('>>> Cleanup system', () => {
  let entity: Entity
  let system: CleanupSystem
  let engine: Engine

  beforeEach(() => {
    engine = new Engine()

    entity = new Entity()
    entity.addComponent(new FrameCollisionComponent())

    system = new CleanupSystem(0, engine)
    engine.addSystem(system, 'other')
    engine.addEntity(entity)
  })

  it('Removes FrameCollisionComponent from entity', () => {
    expect(entity.hasComponent(FrameCollisionComponent)).toBeTrue()
    engine.update(timestep)
    expect(entity.hasComponent(FrameCollisionComponent)).toBeFalse()
  })
})
