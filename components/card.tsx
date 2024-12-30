import React from 'react';
import Image from 'next/image';
import { Product } from '../app/models/interfaces';

interface CardProps {
  product: Product; // Recebe um produto como prop
}

const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className="container mx-auto px-4">
  <div className="product-card m-4 flex flex-col items-center text-center"> 
  <Image
    src={product.image}
    alt={product.title}
    width={200}
    height={200}
    className="rounded-t-lg object-contain"
  />
  <div className="p-2">
    <h2 className="text-lg font-bold truncate">{product.title}</h2>
    <p className="text-gray-600 text-sm line-clamp-3">{product.description}</p>
    <p className="text-blue-500 font-semibold">{product.price.toFixed(2)}€</p>
  </div>
</div>

    </div>
   
  );
};

export default Card;
