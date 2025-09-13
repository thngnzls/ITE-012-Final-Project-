import React from 'react'
import { assets } from '../assets/assets'
import Carousel from './Carousel/Carousel'

const Hero = () => {
  return (

    <Carousel>
      <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
              <div className='text-[#414141]'>
                  <div className='flex items-center gap-2'>
                      <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                      <p className=' font-medium text-sm md:text-base'>THIS IS FOR</p>
                  </div>
                  <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Educational Purposes</h1>
                  <div className='flex items-center gap-2'>
                      <p className='font-semibold text-sm md:text-base'>ONLY</p>
                      <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                  </div>
              </div>
        </div>
        {/* Hero Right Side */}
        <img className='w-full sm:w-1/2 h-full object-cover object-center' src='https://res.cloudinary.com/dz15gvgpl/image/upload/v1747323367/banner1_sajmla.jpg' alt="" />
      </div>
      <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
              <div className='text-[#414141]'>
                  <div className='flex items-center gap-2'>
                      <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                      <p className=' font-medium text-sm md:text-base'>THIS IS FOR</p>
                  </div>
                  <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Educational Purposes</h1>
                  <div className='flex items-center gap-2'>
                      <p className='font-semibold text-sm md:text-base'>ONLY</p>
                      <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                  </div>
              </div>
        </div>
        {/* Hero Right Side */}
        <img className='w-full sm:w-1/2 h-full object-cover object-center' src='https://res.cloudinary.com/dz15gvgpl/image/upload/v1747323356/banner2_bal5jm.jpg' alt="" />
      </div>
      <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
              <div className='text-[#414141]'>
                  <div className='flex items-center gap-2'>
                      <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                      <p className=' font-medium text-sm md:text-base'>THIS IS FOR</p>
                  </div>
                  <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Educational Purposes</h1>
                  <div className='flex items-center gap-2'>
                      <p className='font-semibold text-sm md:text-base'>ONLY</p>
                      <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                  </div>
              </div>
        </div>
        {/* Hero Right Side */}
        <img className='w-full sm:w-1/2 h-full object-cover object-center' src='https://res.cloudinary.com/dz15gvgpl/image/upload/v1747323323/banner3_yik23q.jpg' alt="" />
      </div>
    </Carousel>
  )
}

export default Hero
