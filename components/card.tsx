import React from 'react';
import Image from 'next/image';
import { Product } from '../app/models/interfaces';

interface CardProps {
  product: Product; // Recebe um produto como prop
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 max-w-sm">
      <Image
        src={product.image || '/default-image.png'} // Verificação para imagem padrão
        alt={product.title}
        width={300}
        height={200}
        className="rounded-t-lg"
      />
      <div className="p-2">
        <h2 className="text-lg font-bold">{product.title}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-blue-500 font-semibold">{product.price.toFixed(2)}€</p>
      </div>
    </div>
  );
};

export default Card;
