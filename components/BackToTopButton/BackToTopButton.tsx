'use client'
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react'; // Ícone para o botão

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Função para rolar a página até o topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Rola suavemente para o topo
    });
  };

  // Verifica se o usuário rolou a página
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-opacity duration-300"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;