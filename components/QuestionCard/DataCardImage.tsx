import Image from 'next/image';
// import { fetchImagePlaceholders } from '../Plaiceholder/Plaiceholder';

export async function DataCardImage({ src }: { src: string }) {
  // const blurDataURL = await fetchImagePlaceholders(src)

  return (
    <Image
      src={src}
      alt="Imagem"
      placeholder="blur"
      // blurDataURL={blurDataURL}
      width={0}
      height={0}
      unoptimized
      className="w-full object-cover h-auto"
    />
  );
}
