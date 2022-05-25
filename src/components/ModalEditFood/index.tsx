import { useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'

import { Form } from './styles'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { IModalEditFood } from './types'
import { FormHandles } from '@unform/core'
import { IFood } from '../../types/index'

export function ModalEditFood({
  isOpen,
  onRequestClose,
  editingFood,
  handleUpdateFood,
}: IModalEditFood) {
  const formRef = useRef<FormHandles>(null)

  async function handleSubmit(food: IFood) {
    handleUpdateFood(food)
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}
