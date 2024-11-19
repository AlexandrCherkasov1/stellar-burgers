import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/stores/store';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const id = useParams();
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ingredientData = ingredients.find((item) => item._id === id.id);
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
