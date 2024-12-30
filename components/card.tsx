import React from 'react';
import { Product } from '../app/models/interfaces';

type CardProps = {
  product: Product;
  addItemToCart: (product: Product) => void;
};

const Card: React.FC<CardProps> = ({ product, addItemToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button
        onClick={() => addItemToCart(product)}
        className="add-to-cart-button"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default Card;
