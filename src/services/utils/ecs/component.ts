export interface IComponent {
  name: string
}

export type Constructor<T extends IComponent> = new (...args: any[]) => T
