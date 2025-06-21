import { Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <div className='bg-white z-10 text-black md:px-10 md:pt-10 p-4 py-2 space-y-10 w-full h-fit border-t'>
      <div className='flex justify-between flex-wrap'>
        <div className='flex space-x-1 items-center text-lg font-medium'>
          <Image
            alt=''
            src='/logo.png'
            unoptimized
            height={0}
            width={0}
            className='h-10 w-auto object-cover'
          />
        </div>
        
        <div className='flex space-x-4 '>
          <Facebook />
          <Instagram />
        </div>
      </div>
      <p className='text-center text-slate-400'>© 2024 - Auvn - Academia e Profissão. Todos direitos reservados. | Politica de privacidade</p>
    </div>
  )
}
