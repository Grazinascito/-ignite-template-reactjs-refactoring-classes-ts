import { useState, useEffect } from "react";

import Header from "../../components/Header";
import api from "../../services/api";
import Food from "../../components/Food";
import ModalAddFood from "../../components/ModalAddFood";
import ModalEditFood from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
interface FoodsProps{
  id: number;
  image: string;
  name: string;
  price: string;
  description: string;
  available: boolean;
}
const Dashboard = () => {
  const [foods, setFoods] = useState<FoodsProps[]>([]);
  const [editingFood, setEditingFood] = useState({} as FoodsProps);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const handleRenderFoods = async () => {
    const response = await api.get("/foods");
    setFoods(response.data);
  };

  useEffect(() => {
    handleRenderFoods();
  }, []);

  const handleAddFood = async (food) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
      console.log("feda sdc", foods);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food) => {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food) => food.id !== id);

    setFoods(foodsFiltered);
  };

  const handleEditFood = (food) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };

  const toggleEditModal = () => {
    setEditModalOpen((prevState) => !prevState);
  };

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

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
              handleDelete={() => handleDeleteFood(food.id)}
              handleEditFood={() => handleEditFood(food.id)}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
