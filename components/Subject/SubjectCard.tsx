'use client'

import Link from 'next/link';

function SubjectCard() {

  return (
    <div className="w-full rounded-lg overflow-hidden space-y-4 bg-slate-100">

      <div className="p-4">
        <p>Aqui vai a descrição da questão.</p>
      </div>

      <div className="flex justify-center items-center pb-2">
        <Link href={''} className='text-orange-500 font-medium text-sm'>Exercicios de consolidação</Link>
    </div>
    </div>
  );
}

export default SubjectCard;
