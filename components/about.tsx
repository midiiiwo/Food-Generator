
"use client";

import React from 'react';
import Lottie from 'lottie-react';
import lol from '@/lol.json';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 text-white z-10">
      <h1 className="uppercase text-2xl mb-4">About Our Crew</h1>
      <p className="mb-4 text-center max-w-2xl uppercase">
        We are a diverse and talented crew dedicated to delivering the best services and experiences to our clients.
      </p>
      <div className="flex justify-center w-full max-w-lg h-full">
        <Lottie animationData={lol} />
      </div>
    </div>
  );
};

export default About;
