'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from '@/models/interfaces';
import Card from '@/components/card'; // Certifique-se de que o caminho está correto para o componente Card
import '../globals.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);

  const [search, setSearch] = useState(''); // Estado para a pesquisa
  const [filteredData, setFilteredData] = useState<Product[]>([]); // Estado para os produtos filtrados
  const [cart, setCart] = useState<Product[]>([]); // Estado para o carrinho
  const [isClient, setIsClient] = useState(false); // Estado para controlar a renderização no cliente

  // Atualizar o filteredData sempre que o search ou o data mudarem
  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(newFilteredData);
    }
  }, [search, data]);

  // Evitar erro de hidratação - carregar carrinho apenas no cliente
  useEffect(() => {
    setIsClient(true); // Garantir que o código no cliente será executado depois da primeira renderização
  }, []);

  // Carregar os produtos do carrinho do localStorage
  useEffect(() => {
    if (isClient) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [isClient]);

  // Atualizar o localStorage sempre que o carrinho mudar
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);

  // Função para adicionar um item ao carrinho
  const addItemToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  if (error) return <div>Erro ao carregar os produtos.</div>;
  if (isLoading || !data) return <div>A carregar...</div>;

  return (
    <div>
      <div>
        <h1>Bem-vindo à nossa Loja</h1>
        <p>Veja nossos produtos abaixo:</p>
      </div>
      
      {/* Input de pesquisa */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar produtos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full sm:w-1/2"
        />
      </div>

      {/* Exibição dos produtos */}
      <div className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {filteredData.map((product) => (
            <Card key={product.id} product={product} addItemToCart={addItemToCart} />
          ))}
        </div>
      </div>

      {/* Exibição do carrinho */}
      <div className="cart">
        <h2>Carrinho</h2>
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Preço: ${item.price}</p>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <p>Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
