'use client'
import { DataCard } from '@/components/QuestionCard/Card';
import { useFetchPostById } from '@/utils/Post/FetchPostsById';
import { Box, Typography } from '@mui/material';
import React from 'react'
import { DataCardSkeleton } from '../QuestionCard/DataCardSkeleton';

type Props = {
    params: { _id: string };
};

export default function FetchById({ params }: Props) {

    const { post, loading, error } = useFetchPostById(params._id);

    return (
        <Box
            sx={{
                width: '100%',
                gap: { md: 8 },
                display: 'flex',
                flexDirection: 'column',
                border: 'none',
            }}
        >
            {/* {params._id} */}
            {loading && (
                <Box sx={{ padding: 2 }}>
                    <DataCardSkeleton />
                </Box>
            )}

            {error && (
                <Box role="alert" sx={{ color: 'error.main', padding: 2 }}>
                    {error}
                </Box>
            )}

            {!loading && !error && !post  && (
                <Box sx={{ color: 'text.secondary', padding: 2 }}>
                    Nenhum post disponível.
                </Box>
            )}
            {!loading && post && (
                <Box key={post._id} sx={{ width: '100%' }}>
                    <DataCard post={post} />
                </Box>
            )}
        </Box>
    );
}
