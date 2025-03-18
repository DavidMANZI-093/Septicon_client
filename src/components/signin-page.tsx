import Image from 'next/image';
import React from 'react';
import Auth from './form-signin';

// type Props = {}

const Signin = (/* props: Props */) => {
  return (
    <div className='flex flex-col items-center bg-transparent rounded-sm border border-zinc-700 shadow-lg shadow-zinc-950 m-auto px-14 py-8 gap-4'>
      <Image fetchPriority='high' priority width={124} height={124} alt="Septicon's Logo" src={'/favicon pack/Septicon - Logo.png'} />
      <Auth />
    </div>
  )
}

export default Signin