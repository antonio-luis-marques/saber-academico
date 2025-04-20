'use client';

import Recently from '@/components/Feed/Recently';
import QuestionCard from '@/components/QuestionCard/Card';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function SearchContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search_query') ?? undefined;

    return (
        <div className='md:px-40 py-10 flex flex-wrap space-y-4 md:space-y-0 bg-white w-full'>
            <div className='md:w-3/5 w-full relative flex flex-col divide-y divide-slate-300 space-y-2'>
                <QuestionCard search={search} />
            </div>
            <Recently />
        </div>
    );
}
