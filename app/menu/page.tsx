"use client";
import React, { useState, useEffect } from 'react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { saveFavoritesToLocalStorage, loadFavoritesFromLocalStorage } from '@/components/utils/cacheStorage';
import MagicButton from '../../components/ui/Magicbutton';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';  // Import icons
import LoadingSpinner from '../../components/utils/LoadingComponent';

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
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator

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
        setLoading(false); // Turn off loading indicator after fetching
      }
    };

    fetchCategories();
  }, []);

  const fetchMealsByCategory = async (category: string) => {
    try {
      setLoading(true); // Set loading to true before fetching meals
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
      setLoading(false); // Turn off loading indicator after fetching
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
    <div className='mt-20 max-w-7xl mx-auto px-4'>
      <h1 className='text-center uppercase text-lg my-5'>Our Exquisite Menu</h1>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner /> {/* Show loading spinner while fetching data */}
        </div>
      ) : selectedCategory ? (
        <>
          <div className="grid grid-cols-3 gap-4 p-4">
            {meals.map(meal => (
              <div key={meal.idMeal} className="bg-black-100 border-2 border-white shadow-lg rounded-lg p-4 ">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <h3 className="text-lg text-white font-bold mt-2">{meal.strMeal}</h3>
                <div className="flex justify-center mt-2">
                  <MagicButton
                    title="Like"
                    icon={<FaHeart />}
                    position="left"
                    handleClick={() => handleAddToFavorites(meal)}
                    otherClasses="bg-green-500 hover:bg-green-700"
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
              otherClasses="bg-blue-500 hover:bg-blue-700"
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-3 gap-4 bg-black-100 p-4">
          {categories.map(category => (
            <div
              key={category.idCategory}
              className="bg-black-100 border-2 border-white shadow-lg rounded-lg p-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 "
              onClick={() => handleCategoryClick(category.strCategory)}
            >
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="w-full h-48 object-cover rounded-t-xl"
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