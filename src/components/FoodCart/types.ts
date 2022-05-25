import { IFood } from '../../types'

export interface IFoodCard {
  food: IFood
  handleEdit: (food: IFood) => void
  handleDelete: (id: number) => Promise<void>
}

export interface IContainer {
  available: boolean
}
