import { IFood } from '../../pages/Dashboard/types'

export interface IModalEditFood {
  isOpen: boolean
  onRequestClose: () => void
  editingFood: IFood
  handleUpdateFood: (food: IFood) => Promise<void>
}
