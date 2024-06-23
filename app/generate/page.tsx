"use client";
import React, { useState, useEffect } from 'react';
import { saveFavoritesToLocalStorage, loadFavoritesFromLocalStorage } from '@/components/utils/cacheStorage';
import MagicButton from '@/components/ui/Magicbutton';
import LoadingSpinner from '../../components/utils/LoadingComponent';
import { FaHeart, FaThumbsDown } from 'react-icons/fa';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const GenerateMeal: React.FC = () => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRandomMeal = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setMeal(data.meals[0]);
      }
    } catch (error) {
      console.error('Error fetching random meal:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  const handleAddToFavorites = (meal: Meal) => {
    const favorites = loadFavoritesFromLocalStorage();
    if (!favorites.some((fav: Meal) => fav.idMeal === meal.idMeal)) {
      const newFavorites = [...favorites, meal];
      saveFavoritesToLocalStorage(newFavorites);
      alert('Saved to favorites!');
    }
  };

  const handleDislike = () => {
    fetchRandomMeal();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center my-10 mt-40 text-white z-10 px-4 md:px-0'>
      <TextGenerateEffect 
        words='Our best random meals for you'
        className='text-center text-[30px] md:text-4xl lg:text-5xl text-blue-100'
      />
      <div className='bg-black-100 border-2 border-white shadow-lg rounded-lg w-full max-w-md p-4 flex flex-col justify-between items-center mt-10'>
        <img
          src={meal?.strMealThumb}
          alt={meal?.strMeal}
          className='w-full h-48 object-cover rounded-t-lg'
        />
        <h3 className='text-lg text-white font-bold mt-2 text-center'>{meal?.strMeal}</h3>
        <div className='flex justify-center mt-2 gap-2 w-full'>
          <MagicButton
            title='Like'
            icon={<FaHeart />}
            position='left'
            handleClick={() => handleAddToFavorites(meal!)}
            otherClasses='bg-green-500 hover:bg-green-700 px-4 py-2 text-xs md:text-sm'
          />
          <MagicButton
            title='Dislike'
            icon={<FaThumbsDown />}
            position='left'
            handleClick={handleDislike}
            otherClasses='bg-red-500 hover:bg-red-700 px-4 py-2 text-xs md:text-sm'
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateMeal;
