import { IComponent } from '../utils'

// TODO: could have a _respondsTo property to determine if e.g. WSAD  vs arrows
export class ControllableComponent implements IComponent {
  name = 'controllable'
}
