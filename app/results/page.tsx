'use client';

import React, { Suspense } from 'react';
import SearchContent from '@/components/SearchContent/SearchContent';


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <SearchContent />
        </Suspense>
    );
}
