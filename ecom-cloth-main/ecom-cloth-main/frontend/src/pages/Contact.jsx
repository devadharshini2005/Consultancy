import React from 'react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="Contact" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>
            Shobana S, <br />
            Samrithi Attires, <br />
            122/13, Pandiyan Street, <br />
            Bhavani Main Road, <br />
            Perundurai - 638052.
          </p>
          <p className='text-gray-500'>
            Phone: +91 97896 15685 <br />
            Email: samrithiattires@gmail.com<br />
            GSTIN: 33HJVRPSA8519LZX
          </p>

        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
