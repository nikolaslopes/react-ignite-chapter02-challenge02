import { IFood } from '../../pages/Dashboard/types'

export interface IModalAddFood {
  isOpen: boolean
  onRequestClose: () => void
  handleAddFood: (food: IFood) => Promise<void>
}
