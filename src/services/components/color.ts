import { IComponent } from '/@services/utils'

export class ColorComponent implements IComponent {
  name = 'color'
  public constructor(public color: string = 'rgba(245, 245, 245, 0.8)') {}
}
