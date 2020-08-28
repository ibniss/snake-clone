import { IAwake, IUpdate } from '/@services/utils'
import { Entity } from './entity'

export interface IComponent extends IAwake, IUpdate {
  entity: Entity | null
}
