import { MoveSystem } from './move'
import {
  EntityChainComponent,
  MovableComponent,
  PositionComponent,
} from '/@services/components'
import { Entity, Vector2D, Engine } from '/@services/utils'

// using 1000ms timestep for easier calculation
const time = 1
const timestep = time * 1000

describe('>>> Move system', () => {
  let entity: Entity
  let system: MoveSystem
  let engine: Engine

  let position: PositionComponent
  let movable: MovableComponent

  beforeEach(() => {
    engine = new Engine()

    entity = new Entity()
    position = new PositionComponent(new Vector2D(100, 100))
    entity.addComponent(position)
    movable = new MovableComponent(10, 0)
    entity.addComponent(movable)

    system = new MoveSystem(0, engine)
    engine.addSystem(system, 'other')
    engine.addEntity(entity)
  })

  it('Moves entity correctly horizontally', () => {
    // angle is 0, entity is moving horizontally
    const expectedPositionX = position.position.x + time * movable.velocity
    const expectedPositionY = position.position.y

    engine.update(timestep)

    expect(position.position.x).toBe(expectedPositionX)
    expect(position.position.y).toBe(expectedPositionY)
  })

  it('Moves entity correctly vertically', () => {
    movable.angle = 90

    // angle is 0, entity is moving horizontally
    const expectedPositionX = position.position.x
    const expectedPositionY = position.position.y + time * movable.velocity

    engine.update(timestep)

    expect(position.position.x).toBe(expectedPositionX)
    expect(position.position.y).toBe(expectedPositionY)
  })

  it('Moves entity correctly at an angle', () => {
    movable.angle = 30

    const expectedPositionX =
      position.position.x +
      Math.cos((movable.angle * Math.PI) / 180) * time * movable.velocity
    const expectedPositionY =
      position.position.y +
      Math.sin((movable.angle * Math.PI) / 180) * time * movable.velocity

    engine.update(timestep)

    expect(position.position.x).toBe(expectedPositionX)
    expect(position.position.y).toBe(expectedPositionY)
  })

  it('Moves a chained component towards entity', () => {
    const positionToMove = new PositionComponent(new Vector2D(50, 50))
    entity.addComponent(new EntityChainComponent([positionToMove]))

    movable.angle = 40

    const distanceBefore = new Vector2D(
      position.position.x - positionToMove.position.x,
      position.position.y - positionToMove.position.y
    )

    engine.update(timestep)

    const distanceAfter = new Vector2D(
      position.position.x - positionToMove.position.x,
      position.position.y - positionToMove.position.y
    )

    expect(distanceAfter.length).toBeCloseTo(distanceBefore.length, 1)
  })
})
