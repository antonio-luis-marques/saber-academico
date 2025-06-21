'use client';

import { IPost } from '@/utils/Types';
import { useFetchPosts } from '@/utils/Post/FetchPosts';

import { Box, IconButton, Pagination, Snackbar, Typography } from '@mui/material';
import { DataCardSkeleton } from './DataCardSkeleton';
import { Download, Link as LinkLucide } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Share } from '@mui/icons-material';
import axios from 'axios';

export function DataCard({ post }: { post: IPost }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [pdfSize, setPdfSize] = useState<number | null>(null);

  useEffect(() => {
    const fetchPdfSize = async () => {
      if (post.pdfUrl) {
        try {
          const response = await axios.head(post.pdfUrl);
          const contentLength = response.headers['content-length'];
          if (contentLength) {
            setPdfSize(parseInt(contentLength, 10));
          }
        } catch (error) {
          console.error('Erro ao buscar o tamanho do PDF:', error);
        }
      }
    };

    fetchPdfSize();
  }, [post.pdfUrl]);

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`);
    setCopySuccess(true);
  };

  const handleCloseSnackbar = () => {
    setCopySuccess(false);
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.description,
      url: `${window.location.origin}/post/${post._id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Link compartilhado com sucesso!');
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      alert('O compartilhamento não é suportado neste navegador.');
    }
  };



  return (
    <Box border="1px solid #ddd" borderRadius={2} p={2} mb={2}>
      <Typography variant="h5">
        <Link href={`/post/${post._id}`}>{post.title}</Link>
      </Typography>
      <Typography>{post.description}</Typography>

      {post.imageUrl && (
        <div className='h-72 w-full overflow-hidden'>
          <Image
            src={post.imageUrl}
            alt={post.title}
            unoptimized
            width={0}
            height={0}
            className="w-full h-full object-cover"
          />
        </div>

      )}
      {pdfSize !== null && (
        <Typography variant="body2" sx={{ marginTop: 4 }}>
          {formatFileSize(pdfSize)}
        </Typography>
      )}
      <Box display="flex" alignItems="center">
        <IconButton href={post.pdfUrl} target="_blank" rel="noopener noreferrer">
          <Download />
        </IconButton>

        <IconButton onClick={handleCopyLink}>
          <LinkLucide />
        </IconButton>
        <IconButton onClick={handleShare}>
          <Share />
        </IconButton>
      </Box>
      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Link copiado!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}

function QuestionCard({
  search = '',
}: {
  search?: string
}) {
  const [page, setPage] = useState(1);
  const limit = 10; // Número de posts por página
  const { posts, loading, error, totalPages } = useFetchPosts(search, page, limit);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gap: { xs: 2, md: 4 }, // gap entre os cards
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, // 1 coluna em telas pequenas, 2 em md+
        border: 'none',
      }}
    >
      {loading && (
        [1, 2, 3, 4].map((_, index) => (
          <Box key={index} sx={{ width: '100%' }}>
            <DataCardSkeleton />
          </Box>
        ))
      )}


      {error && (
        <Box role="alert" sx={{ color: 'error.main', padding: 2 }}>
          {error}
        </Box>
      )}

      {!loading && !error && posts.length === 0 && (
        <Box sx={{ color: 'text.secondary', padding: 2 }}>
          Nenhuma post disponível.
        </Box>
      )}

      {!loading &&
        posts.map((post) => (
          <Box key={post._id} sx={{ width: '100%' }}>
            <DataCard post={post} />
          </Box>
        ))}

      {!loading && totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          // showFirstButton
          // showLastButton
          />
        </Box>
      )}
    </Box>
  );
}

export default QuestionCard;