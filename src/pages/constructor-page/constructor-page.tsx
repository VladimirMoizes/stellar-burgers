import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { getIngredientsSelector } from '../../services/slices/ingredientSlice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const { items, loading, error } = useSelector(getIngredientsSelector);

  // Перенёс в App.tsx, чтобы при обновлении страницы на другой вкладке сразу загружались ингредиенты
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (items.length === 0) {
  //     dispatch(getIngredients());
  //   }
  // }, [dispatch, items.length]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
