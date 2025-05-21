import React from 'react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About Samrithi Attires" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Welcome to <strong>Samrithi Attires</strong>, where tradition meets elegance.
            Located in Perundurai, Tamil Nadu, Samrithi Attires is your one-stop destination
            for exquisite ethnic wear that celebrates India's rich heritage.
          </p>
          <p>
            Founded by <strong>Shobana S</strong>, we take pride in offering beautifully crafted attire
            that blends traditional craftsmanship with contemporary design. From casual wear
            to festive collections, every piece is thoughtfully curated to reflect quality,
            comfort, and timeless style.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission at Samrithi Attires is to help you embrace the beauty of Indian culture
            through fashion. We aim to deliver authentic ethnic wear while ensuring quality,
            personal service, and an enjoyable shopping experience for every customer.
          </p>
          <p>
            Visit us at: 122/13, Pandiyan Street, Bhavani Main Road, Perundurai - 638052  
            <br />
            📞 +91 97896 15685 | 📧 samrithiattires@gmail.com  
            <br />
            GSTIN: 33HJVRPSA8519LZX
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Authentic Designs</b>
          <p className='text-gray-600'>
            Every piece is thoughtfully selected to ensure authenticity and reflect the timeless beauty of Indian fashion.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Personalized Experience</b>
          <p className='text-gray-600'>
            We provide a warm, personalized shopping experience both in-store and online to help you find the perfect outfit.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality & Satisfaction</b>
          <p className='text-gray-600'>
            We ensure the highest quality standards and dedicated support to guarantee your satisfaction with every purchase.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
