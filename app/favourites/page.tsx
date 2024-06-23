"use client";
import React, { useEffect, useState } from 'react';
import { loadFavoritesFromLocalStorage, saveFavoritesToLocalStorage } from '@/components/utils/cacheStorage';
import Magicbutton from '@/components/ui/Magicbutton';
import { FaTrash } from 'react-icons/fa';  // Import icon
import LoadingSpinner from '@/components/utils/LoadingComponent'; // Import loading spinner component
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const Favourites: React.FC = () => {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator

  useEffect(() => {
    // Simulate loading delay for demo purposes
    const timeout = setTimeout(() => {
      setFavorites(loadFavoritesFromLocalStorage());
      setLoading(false); // Turn off loading indicator after loading favorites
    }, 1000); // Adjust delay as needed for your application

    return () => clearTimeout(timeout); // Cleanup on component unmount
  }, []);

  const handleRemoveFromFavorites = (idMeal: string) => {
    const newFavorites = favorites.filter(meal => meal.idMeal !== idMeal);
    setFavorites(newFavorites);
    saveFavoritesToLocalStorage(newFavorites);
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <LoadingSpinner /> {/* Show loading spinner while fetching data */}
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center my-10 mt-40 text-white z-10'>
      <TextGenerateEffect words={'Your Favorites'  }
      className='text-center text-[40px] md:text-4xl lg:text-5xl text-blue-100'/>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {favorites.map(meal => (
            <div key={meal.idMeal} className="bg-black-100 border-2 border-white shadow-lg rounded-lg p-4 ">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <h3 className="text-lg text-white font-bold mt-2">{meal.strMeal}</h3>
              <div className='flex justify-center mt-2'>
              <Magicbutton
                title="Remove"
                icon={<FaTrash />}
                position="left"
                handleClick={() => handleRemoveFromFavorites(meal.idMeal)}
                otherClasses="bg-red-500 hover:bg-red-700"
              />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center'>No favorites added yet. Check out our exquisite menu.</p>
      )}
    </div>
  );
};

export default Favourites;
