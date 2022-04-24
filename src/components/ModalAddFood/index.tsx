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
  handleAddFood: (data: FoodProps) => void;
  setIsOpen: () => void;
  
}

const ModalAddFood = ({ isOpen, setIsOpen, handleAddFood }: ModalFoodProps) => {
  const formRef = useRef(null);
  const handleSubmit = async (data: FoodProps) => {
    console.log("data", data)
    handleAddFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" icon={""} />

        <Input name="name" placeholder="Ex: Moda Italiana" icon={""} />
        <Input name="price" placeholder="Ex: 19.90" icon={""} />

        <Input name="description" placeholder="Descrição" icon={""} />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
