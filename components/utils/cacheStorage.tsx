// Utility functions for handling localStorage operations

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }
  
// localStorageUtils.ts
export const loadFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const saveFavoritesToLocalStorage = (favorites: any) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
