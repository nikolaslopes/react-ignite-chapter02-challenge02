import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { api } from '../../services/api'
import Food from '../../components/Food'
import { ModalAddFood } from '../../components/ModalAddFood'
import ModalEditFood from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'

import { IFoods } from './types'

export function Dashboard() {
  const [foods, setFoods] = useState<IFoods[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingFood, setEditinFood] = useState([])

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

  async function handleAddFood(food) {
    const { foods } = this.state

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      })

      this.setState({ foods: [...foods, response.data] })
    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateFood(food) {
    const { foods, editingFood } = this.state

    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      })

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      )

      this.setState({ foods: foodsUpdated })
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteFood(id) {
    const { foods } = this.state

    await api.delete(`/foods/${id}`)

    const foodsFiltered = foods.filter((food) => food.id !== id)

    this.setState({ foods: foodsFiltered })
  }

  function toggleModal() {
    setModalOpen(!modalOpen)
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  function handleEditFood(food) {
    this.setState({ editingFood: food, editModalOpen: true })
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
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
