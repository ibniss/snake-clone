import { PositionComponent } from './position'
import { IComponent } from '/@services/utils'

export class EntityChainComponent implements IComponent {
  name = 'entity-chain'

  // holds a list of position components of entities in the chain
  constructor(public positionComponents: PositionComponent[] = []) {}
}
