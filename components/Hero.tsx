
import React from 'react';
import { IoFastFoodOutline } from "react-icons/io5";
import { TextGenerateEffect } from './ui/text-generate-effect';
import MagicButton from '@/components/ui/Magicbutton';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className='h-screen w-full dark:bg-black-100 flex items-center justify-center overflow-hidden text-blue-100'>
      <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100'>
      </div>
      <div className='flex flex-col justify-center relative my-10 z-10'>
        <div className='max-w-[90vw] md:max-w-2xl lg:max-w-4xl mt-20 mx-auto text-center'>
          <h2 className='text-blue-100 uppercase tracking-widest text-xs'>
            Food generator
          </h2>
          <TextGenerateEffect 
            words='Craft your culinary masterpieces and embark on a journey to a world of exquisite delights.'
            className='text-[30px] md:text-4xl lg:text-5xl text-blue-100'
          />
          <p className='mt-3 mb-4 text-sm md:text-lg lg:text-2xl'>
            Hi! I&apos;m Quentin
          </p>
          <div className='flex justify-center'>
            <Link href={'/generate'}>
              <MagicButton 
                title='Generate food'
                icon={<IoFastFoodOutline />}
                position='left'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
