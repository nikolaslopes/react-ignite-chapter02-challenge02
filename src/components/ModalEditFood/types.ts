import { IFood } from '../../types/index'

export interface IModalEditFood {
  isOpen: boolean
  onRequestClose: () => void
  editingFood: IFood
  handleUpdateFood: (food: IFood) => Promise<void>
}
