import { Engine } from '.'
import { System } from '/@services/utils'

const s1UpdateMock = jest.fn()
const s1AwakeMock = jest.fn()
const s2UpdateMock = jest.fn()
const s2AwakeMock = jest.fn()

class S1 extends System {
  public awake(): void {
    s1AwakeMock()
  }

  public update(): void {
    s1UpdateMock()
  }
}
class S2 extends System {
  public awake(): void {
    s2AwakeMock()
  }

  public update(): void {
    s2UpdateMock()
  }
}

describe('>>> Engine', () => {
  let engine: Engine

  let s1: S1
  let s2: S2

  beforeEach(() => {
    engine = new Engine()
    s1 = new S1(0, engine)
    s2 = new S2(1, engine)
  })

  it('should awake all systems', () => {
    const spy1 = jest.spyOn(s1, 'awake')
    const spy2 = jest.spyOn(s2, 'awake')

    expect(spy1).not.toBeCalled()
    expect(spy2).not.toBeCalled()

    engine.addSystem(s1)
    engine.addSystem(s2)

    engine.awake()

    expect(spy1).toBeCalled()
    expect(spy2).toBeCalled()
  })

  it('should update all systems', () => {
    const spy1 = jest.spyOn(s1, 'update')
    const spy2 = jest.spyOn(s2, 'update')

    expect(spy1).not.toBeCalled()
    expect(spy2).not.toBeCalled()

    engine.addSystem(s1)
    engine.addSystem(s2)

    engine.update(0)

    expect(spy1).toBeCalled()
    expect(spy2).toBeCalled()
  })

  it('initial awake sorts systems', () => {
    // make sure s2 has priority over s1
    s1 = new S1(1, engine)
    s2 = new S2(0, engine)

    engine.addSystem(s1)
    engine.addSystem(s2)

    engine.awake()

    // s2 should be called before s1
    expect(s2AwakeMock).toHaveBeenCalledBefore(s1AwakeMock)
  })

  it('initial update sorts systems', () => {
    // make sure s2 has priority over s1
    s1 = new S1(1, engine)
    s2 = new S2(0, engine)

    engine.addSystem(s1)
    engine.addSystem(s2)

    engine.update(0)

    // s2 should be called before s1
    expect(s2UpdateMock).toHaveBeenCalledBefore(s1UpdateMock)
  })
})
