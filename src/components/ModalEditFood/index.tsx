import { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";


interface FoodProps {
  description: string;
  image: string;
  name: string;
  price: string;
}
interface ModalFoodProps {
  isOpen: boolean;
  handleUpdateFood: (data: FoodProps) => void;
  setIsOpen: () => void;
  editingFood: FoodProps
}
const ModalEditFood = ({
  setIsOpen,
  handleUpdateFood,
  isOpen,
  editingFood,
}: ModalFoodProps) => {
  const formRef = useRef();
  console.log("editing", editingFood)

  const handleSubmit = async (data: FoodProps) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" icon={""} />

        <Input name="name" placeholder="Ex: Moda Italiana" icon={""} />
        <Input name="price" placeholder="Ex: 19.90" icon={""} />

        <Input name="description" placeholder="Descrição" icon={""} />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
