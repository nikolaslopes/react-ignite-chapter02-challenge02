import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { api } from '../../services/api'
import Food from '../../components/Food'
import { ModalAddFood } from '../../components/ModalAddFood'
import { ModalEditFood } from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'

import { IFood } from './types'

export function Dashboard() {
  const [foods, setFoods] = useState<IFood[]>([])
  const [modalAddFoodOpen, setModalAddFoodOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood)

  // const { modalOpen, editModalOpen, editingFood, foods } = this.state;

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     foods: [],
  //     editingFood: {},
  //     modalOpen: false,
  //     editModalOpen: false,
  //   }
  // }

  async function fetchFoods() {
    const { data } = await api.get('/foods')

    console.log(data)

    setFoods(data)
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  async function handleAddFood(food: IFood) {
    try {
      const response = await api.post('foods', {
        ...food,
        available: true,
      })

      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateFood(food: IFood) {
    try {
      const foodUpdated = await api.put(`foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      })

      const foodsUpdated = foods.map((food) =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data
      )

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter((food) => food.id !== id)
    setFoods(foodsFiltered)
  }

  function toggleModalAddFood() {
    setModalAddFoodOpen(!modalAddFoodOpen)
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  function handleEditFood(food: IFood) {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openAddFoodModal={toggleModalAddFood} />

      <ModalAddFood
        isOpen={modalAddFoodOpen}
        onRequestClose={toggleEditModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        onRequestClose={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
