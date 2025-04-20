import { useState, useEffect } from 'react';
import axios from 'axios';
import { IPost } from '../Types';


export function useFetchPosts(search?: string, page: number = 1, limit: number = 10) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      setError(null);
      setLoading(true);

      try {
        const query = `?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
        const response = await axios.get(`https://upload-api-nodejs.vercel.app/posts${query}`);
        const { posts: fetchedPosts, totalPages } = response.data;

        if (isMounted) {
          if (Array.isArray(fetchedPosts)) {
            setPosts(fetchedPosts);
            setTotalPages(totalPages);
          } else {
            setError('Os dados recebidos não estão no formato esperado.');
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Erro ao carregar os dados. Verifique sua conexão ou tente novamente mais tarde.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [search, page, limit]);

  return { posts, loading, error, totalPages };
}
