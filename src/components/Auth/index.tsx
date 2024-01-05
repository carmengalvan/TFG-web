import React, { FC, ReactNode } from 'react';
import Image from 'next/image'

interface AuthProps {
  children: ReactNode;
  imageSrc: string;
}

const Auth: FC<AuthProps> = ({ children, imageSrc }) => {
  return (
    <div className='bg-teal-600 h-screen w-screen'>
        <div className='bg-teal-600 mt-5 flex flex-col items-center'>
            {imageSrc && <Image
            src={imageSrc}
            width={350}
            height={350}
            className='mx-auto'
            alt='Image'
            />}
            {children} 
        </div>
    </div>
  )
};

export default Auth;
