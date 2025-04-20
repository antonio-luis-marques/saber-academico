import React from 'react'
import QuestionCard from '../QuestionCard/Card'



export default function Main() {
  return (
    <div className='md:w-3/5 w-full relative flex flex-col divide-y divide-slate-300 md:space-y-2'>
      <QuestionCard />
    </div>
  )
}