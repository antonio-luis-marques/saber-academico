'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Help from '../../public/help.png'

export default function Recently() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);


  useEffect(() => {
    if (divRef.current) {
      // Pega o tamanho inicial da div
      setHeight(divRef.current.getBoundingClientRect().height);

      // Atualiza o tamanho se a janela for redimensionada
      const handleResize = () => {
        if (divRef.current) {
          setHeight(divRef.current.getBoundingClientRect().height);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [lastScrollY]);

  return (
    <div
      className={`md:w-2/5 z-10
        ${lastScrollY > height ? 'md:fixed top-0 md:pr-32 right-8 md:pl-20' : 'md:pl-20'
        } `}
    >
      <div ref={divRef} className="space-y-2">
        <h2 className="font-semibold">Publicidade</h2>
        <div className="w-full">
          <Image
            alt=""
            src={Help}
            // unoptimized
            height={0}
            width={0}
            placeholder='blur'
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}
