'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from '../models/interfaces';
import Card from '@/components/card';
import '../globals.css'; // Ajuste conforme necessário

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error, isLoading } = useSWR<Product[]>('https://deisishop.pythonanywhere.com/products/', fetcher);

  const [search, setSearch] = useState(""); // Estado para a pesquisa
  const [filteredData, setFilteredData] = useState<Product[]>([]); // Estado para os produtos filtrados

  // Atualizar o filteredData sempre que o search ou o data mudarem
  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(newFilteredData);
    }
  }, [search, data]);

  if (error) return <div>Erro ao carregar os produtos.</div>;
  if (isLoading || !data) return <div>A carregar...</div>;

  return (
    <main className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo à nossa Loja</h1>
        <p className="text-lg mb-6">Veja nossos produtos abaixo:</p>
      </div>

      {/* Input de pesquisa */}
      <div className="search-bar mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Pesquisar produtos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2 shadow-sm"
        />
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
