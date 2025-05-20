import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Company Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Samrithi Attires is your go-to fashion destination, combining style with comfort. Visit us at our store for the latest collections.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Shobana S</li>
            <li>Samrithi Attires</li>
            <li>122/13, Pandiyan Street</li>
            <li>Bhavani Main Road, Perundurai - 638052</li>
            <li>Phone: +91 97896 15685</li>
            <li>Email: samrithiattires@gmail.com</li>
            <li>GSTIN: 33HJVRPSA8519LZX</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr className='my-5' />
        <p className='py-5 text-sm text-center text-gray-500'>
          © 2024 samrithiattires.com - All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
