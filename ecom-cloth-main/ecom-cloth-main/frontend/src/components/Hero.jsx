import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          
          <Link to="/collection">
            <button className='mt-5 px-6 py-3 text-sm sm:text-base bg-black text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300'>
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>

      {/* Hero Right Side */}
      <img className='w-full sm:w-1/2' src={assets.hero_img} alt="Hero" />
    </div>
  );
};

export default Hero;
