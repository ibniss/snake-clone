import { DeadSystem } from './dead'
import { FrameCollisionComponent, CollideTag } from '/@services/components'
import { Entity, Engine } from '/@services/utils'

// using 1000ms timestep for easier calculation
const time = 1
const timestep = time * 1000

describe('>>> Collision system', () => {
  let entity: Entity
  let system: DeadSystem
  let engine: Engine

  beforeEach(() => {
    engine = new Engine()
    entity = new Entity()

    system = new DeadSystem(0, engine)
    engine.addSystem(system, 'other')
    engine.addEntity(entity)
  })

  it.each([
    ['lost', 'head', 'border'],
    ['lost', 'head', 'body'],
    ['running', 'head', 'food'],
    ['running', 'body', 'head'],
  ])(
    'sets game status to %s when %s collides with %s',
    (result, tagA, tagB) => {
      engine.awake()

      expect(engine.status).toBe('running')

      entity.addComponent(
        new FrameCollisionComponent([
          { a: tagA as CollideTag, b: tagB as CollideTag },
        ])
      )

      engine.update(timestep)

      expect(engine.status).toBe(result)
    }
  )
})
