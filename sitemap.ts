import axios from 'axios';
import { MetadataRoute } from 'next';
import { IPost } from './utils/Types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response = await axios.get('https://upload-api-nodejs.vercel.app/posts');
    const { posts }: { posts: IPost[] } = response.data; // Certifique-se de que `posts` é um array.

    // Mapeando os posts para criar os URLs por ID
    const postEntriesById: MetadataRoute.Sitemap = posts.map(({ _id }) => ({
        url: `https://docbit.vercel.app/post/${_id}`,
    }));

    // Gerar URLs de pesquisa baseadas no título dos posts
    const titleSearchEntries: MetadataRoute.Sitemap = posts.map(post => ({
        url: `https://docbit.vercel.app/poosts?query=${encodeURIComponent(post.title)}`,
    }));

    return [
        {
            url: 'https://docbit.vercel.app/',
            lastModified: new Date(),
        },
        ...postEntriesById,
        ...titleSearchEntries, // Incluindo as URLs de pesquisa baseadas nos títulos
    ];
}
