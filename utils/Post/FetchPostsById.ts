import { useState, useEffect } from 'react';
import axios from 'axios';
import { IPost } from '../Types';

export function useFetchPostById(postId: string) {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return; // Se o postId for vazio, não faz a requisição

    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://upload-api-nodejs.vercel.app/post/${postId}`);
        const fetchedPost = response.data.data; // Corrigido para acessar a estrutura correta

        if (isMounted) {
          if (fetchedPost) {
            setPost(fetchedPost);
          } else {
            setError('Post não encontrado.');
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

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  return { post, loading, error };
}
