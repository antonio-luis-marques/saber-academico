import React from 'react';
import { CheckCircle } from 'lucide-react'; // Ícone de sucesso
import { useRouter } from 'next/navigation';
import { Card } from '@mui/material';

interface SuccessCardProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessCard: React.FC<SuccessCardProps> = ({ setSuccess }) => {
  const router = useRouter();

  const handleRedirectHome = () => {
    router.push('/'); // Redireciona para a página inicial
  };

  const handleStayOnPage = () => {
    setSuccess(false); // Atualiza o estado para false (ou conforme necessário)
  };

  return (
    <div className="absolute h-full w-full justify-center items-center flex flex-col bg-white z-20">
      <div className="max-w-md mx-auto bg-white shadow-lg border rounded-lg p-6">
        <div className="flex flex-col items-center">
          <CheckCircle className="text-green-500" size={50} />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Sucesso! Dados enviados.
          </h3>
          <div className="mt-6 space-y-4 w-full">
            <button
              onClick={handleRedirectHome}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Ir para a página inicial
            </button>
            <button
              onClick={handleStayOnPage}
              className="w-full py-2 bg-transparent border-2 border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none"
            >
              Ficar nesta página
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
