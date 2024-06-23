"use client";
import React, { useState, useEffect } from 'react';
import { saveFavoritesToLocalStorage, loadFavoritesFromLocalStorage } from '@/components/utils/cacheStorage';
import MagicButton from '@/components/ui/Magicbutton';
import LoadingSpinner from '../../components/utils/LoadingComponent';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

const Page: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        if (data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchMealsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
        setSelectedCategory(category);
      } else {
        setMeals([]);
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error(`Error fetching meals for category ${category}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    fetchMealsByCategory(category);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setMeals([]);
  };

  const handleAddToFavorites = (meal: Meal) => {
    const favorites = loadFavoritesFromLocalStorage();
    if (!favorites.some((fav: Meal) => fav.idMeal === meal.idMeal)) {
      const newFavorites = [...favorites, meal];
      saveFavoritesToLocalStorage(newFavorites);
      alert('Saved to favorites!');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center my-10 mt-40 text-white z-10 px-4 md:px-0'>
      <TextGenerateEffect
        words='Our Exquisite Menu'
        className='text-center text-[30px] md:text-4xl lg:text-5xl text-blue-100'
      />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner />
        </div>
      ) : selectedCategory ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full max-w-6xl">
            {meals.map(meal => (
              <div key={meal.idMeal} className="bg-black-100 border-2 border-white shadow-lg rounded-lg p-4">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-lg text-white font-bold mt-2">{meal.strMeal}</h3>
                <div className="flex justify-center mt-2">
                  <MagicButton
                    title="Like"
                    icon={<FaHeart />}
                    position="left"
                    handleClick={() => handleAddToFavorites(meal)}
                    otherClasses="bg-green-500 hover:bg-green-700 px-4 py-2 text-xs md:text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <MagicButton
              title="Back to Categories"
              icon={<FaArrowLeft />}
              position="left"
              handleClick={handleBack}
              otherClasses="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-xs md:text-sm"
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full max-w-6xl">
          {categories.map(category => (
            <div
              key={category.idCategory}
              className="bg-black-100 border-2 border-white shadow-lg rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleCategoryClick(category.strCategory)}
            >
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-lg text-white font-bold mt-2">{category.strCategory}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
