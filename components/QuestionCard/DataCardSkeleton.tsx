'use client';

import { Box, Skeleton} from '@mui/material';

export function DataCardSkeleton() {
  return (
    <Box
      border="1px solid #ddd"  borderRadius={2} p={2} mb={2} sx={{backgroundColor: 'white'}}
    >
      {/* Skeleton do título */}
      <Skeleton variant="text" width="80%" height={30} sx={{ marginBottom: 2 }} />

      {/* Skeleton da descrição */}
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="95%" height={20} />
      <Skeleton variant="text" width="90%" height={20} sx={{ marginBottom: 2 }} />

      {/* Skeleton do carrossel/PDF */}
      <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 1, marginBottom: 2 }} />

      {/* Skeleton dos botões */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
      </Box>
    </Box>
  );
}
