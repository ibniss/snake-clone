import { Entity } from './entity'
import { Family } from './family'
import { Engine } from '../engine'
import { IComponent } from './component'

class C1 implements IComponent {
  name = 'c1'
}
class C2 implements IComponent {
  name = 'c2'
}

describe('>>> Family', () => {
  let engine: Engine

  beforeEach(() => {
    engine = new Engine()
  })

  it('empty family returns all entities', () => {
    engine.addEntities(new Entity(), new Entity())
    const family = new Family(engine, [], [], [])
    expect(family.entities.length).toBe(engine.entities.length)
  })

  it('all rule', () => {
    const e1 = new Entity()
    const e2 = new Entity()

    // add both components to e1
    e1.addComponent(new C1())
    e1.addComponent(new C1())

    // add only c1 to e1
    e2.addComponent(new C1())

    // require both c1 and c2
    engine.addEntities(e1, e2)
    const family = new Family(engine, [C1, C2], [], [])

    expect(family.entities.length).not.toBe(engine.entities.length)
  })

  it('one rule', () => {
    const e1 = new Entity()
    const e2 = new Entity()

    // add both components to e1
    e1.addComponent(new C1())

    // add only c1 to e1
    e2.addComponent(new C2())

    // require c1 OR c2
    engine.addEntities(e1, e2)
    const family = new Family(engine, [], [C1, C2], [])

    expect(family.entities.length).toBe(engine.entities.length)
  })

  it('none rule', () => {
    const e1 = new Entity()
    const e2 = new Entity()

    // add both components to e1
    e1.addComponent(new C1())

    // add only c1 to e1
    e2.addComponent(new C1())
    e2.addComponent(new C2())

    // disallow C2
    engine.addEntities(e1, e2)
    const family = new Family(engine, [], [], [C2])

    expect(family.entities.length).not.toBe(engine.entities.length)
  })
})
