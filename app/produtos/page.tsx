// app/produtos/page.tsx
'use client';

import React from 'react';
import Link from 'next/link'; // Adicione esta linha para importar o Link
import useSWR from 'swr';
import { Product } from '../models/interfaces';
import Card from '../../components/card'; // Ajuste o caminho conforme necessário

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Produtos() {
  const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);

  if (error) return <div>Erro ao carregar os produtos.</div>;
  if (isLoading || !data) return <div>A carregar...</div>;

  return (
    <div>
      <h1>Produtos</h1>
      <nav>
      <Link href="/" className="text-blue-500 underline">Voltar</Link>
            </nav>
      
      <div className="container mx-auto px-4">
        <div className="product-grid">
          {data.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
