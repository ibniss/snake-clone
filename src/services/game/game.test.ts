import { Game } from '/@services/game'
import { IComponent } from '/@services/utils'
import { Grid } from '/@services/grid'

class C1 implements IComponent {
  public entity: Game = new Game()
  public awake(): void {
    /* ... */
  }

  public update(): void {
    /* ... */
  }
}
class C2 implements IComponent {
  public entity: Game = new Game()
  public awake(): void {
    /* ... */
  }

  public update(): void {
    /* ... */
  }
}
class C3 implements IComponent {
  public entity: Game = new Game()
  public awake(): void {
    /* ... */
  }

  public update(): void {
    /* ... */
  }
}

describe('>>> Game', () => {
  let game: Game

  const c1 = new C1()
  const c2 = new C2()
  const c3 = new C3()

  beforeEach(() => {
    game = new Game()
    window.requestAnimationFrame = jest.fn().mockImplementationOnce(cb => cb())
  })

  it('should start update loop next frame after awake', () => {
    const spy = jest.spyOn(game, 'update')
    game.awake()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should awake all Components', () => {
    const spy1 = jest.spyOn(c1, 'awake')
    const spy2 = jest.spyOn(c2, 'awake')
    const spy3 = jest.spyOn(c3, 'awake')

    expect(spy1).not.toBeCalled()
    expect(spy2).not.toBeCalled()
    expect(spy3).not.toBeCalled()

    game.addComponent(c1)
    game.addComponent(c2)
    game.addComponent(c3)

    game.awake()

    expect(spy1).toBeCalled()
    expect(spy2).toBeCalled()
    expect(spy3).toBeCalled()
  })

  it('should update all Components', () => {
    const spy1 = jest.spyOn(c1, 'update')
    const spy2 = jest.spyOn(c2, 'update')
    const spy3 = jest.spyOn(c3, 'update')

    expect(spy1).not.toBeCalled()
    expect(spy2).not.toBeCalled()
    expect(spy3).not.toBeCalled()

    game.addComponent(c1)
    game.addComponent(c2)
    game.addComponent(c3)

    game.update()

    expect(spy1).toBeCalled()
    expect(spy2).toBeCalled()
    expect(spy3).toBeCalled()
  })

  it('should awake and update all children', () => {
    const spyGridAwake = jest.spyOn(Grid.prototype, 'awake')
    const spyGridUpdate = jest.spyOn(Grid.prototype, 'update')

    // TODO: test more children

    expect(spyGridAwake).not.toBeCalled()
    expect(spyGridUpdate).not.toBeCalled()

    game.awake()
    expect(spyGridAwake).toBeCalled()

    game.update()
    expect(spyGridUpdate).toBeCalled()
  })
})
