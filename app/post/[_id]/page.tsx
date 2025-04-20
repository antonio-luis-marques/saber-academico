import Recently from '@/components/Feed/Recently';
import FetchById from '@/components/Post/FetchById';
import { IPost } from '@/utils/Types';
import { Metadata } from 'next';
import axios from 'axios';
import React, { useEffect } from 'react';

type Props = {
  params: { _id: string };
};

async function fetchPostById(_id: string): Promise<IPost | null> {
  try {
    const response = await axios.get(`https://upload-api-nodejs.vercel.app/post/${_id}`);
    return response.data.data || null; // Retorna o post corretamente
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return null;
  }
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPostById(params._id);

  if (post) {
    return {
      title: post.title || params._id,
      description: post.description || ' ',
      openGraph: {
        title: post.title,
        description: post.description || ' ',
        images: post.imageUrl ? [{ url: post.imageUrl, alt: 'Post Cover Image' }] : [],
      },
    };
  }

  return {
    title: 'Post não encontrado',
    description: 'O post solicitado não foi encontrado ou não está disponível.',
    openGraph: {
      title: 'Post não encontrado',
      description: 'O post solicitado não foi encontrado ou não está disponível.',
    },
  };
}



export default function Post({ params }: Props) {
  
  return (
    <div className='md:px-40 px-4 py-10 flex flex-wrap space-y-4 md:space-y-0 bg-white w-full'>
      <div className='md:w-3/5 w-full relative flex flex-col divide-y divide-slate-300 md:space-y-2'>
      {/* <p>{params._id}</p> */}
        <FetchById params={params} />
      </div>
      <Recently />
    </div>
  );
}
