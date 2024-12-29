'use client';

import React from 'react';
import useSWR from 'swr';
import { Product } from './models/interfaces';
import Card from '../components/card';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);

  if (error) return <div>Erro ao carregar os produtos.</div>;
  if (isLoading || !data) return <div>A carregar...</div>;

  return (
    <>
      <div>
        <h1>Bem-vindo à nossa Loja</h1>
        <p>Veja nossos produtos abaixo:</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
       {data.map((product) => (
          <Card key={product.id} product={product} /> // Usa o Card para cada produto
        ))}
       
      </div>
    </>
  );
}
