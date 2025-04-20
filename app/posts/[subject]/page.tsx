import Recently from '@/components/Feed/Recently'
import QuestionCard from '@/components/QuestionCard/Card'
import { Metadata } from 'next'
import React from 'react'

type Props = {
  params: { subject: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  return {
    title: `${params.subject}`, // Ajuste o título conforme necessário
  };
}

export default function Post({ params }: Props) {
  return (
    <div className='md:px-40 px-4 py-10 flex flex-wrap space-y-4 md:space-y-0 bg-white w-full'>
      <div className='md:w-3/5 w-full relative flex flex-col divide-y divide-slate-300 md:space-y-2'>
        <QuestionCard search={params.subject} />
      </div>
      <Recently />
    </div>
  )
}
