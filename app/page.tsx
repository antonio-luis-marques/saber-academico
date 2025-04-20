import Main from '@/components/Feed/Main'
import Recently from '@/components/Feed/Recently'
import React from 'react'

export default async function Home() {
  return (
    <div className='md:px-40 px-4 py-10 flex flex-wrap space-y-4 md:space-y-0 bg-white w-full'>
      <Main />
      <Recently/>
    </div> 
  )
}