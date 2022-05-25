import { IFood } from '../../types/index'

export interface IModalAddFood {
  isOpen: boolean
  onRequestClose: () => void
  handleAddFood: (food: IFood) => Promise<void>
}
