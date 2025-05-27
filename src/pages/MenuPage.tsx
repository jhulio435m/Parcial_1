import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { mockMenuItems } from '../data/mockData';
import Card from '../components/common/Card';

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'entradas' | 'principales' | 'postres' | 'bebidas'>('all');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'entradas', name: 'Entradas' },
    { id: 'principales', name: 'Platos Principales' },
    { id: 'postres', name: 'Postres' },
    { id: 'bebidas', name: 'Bebidas' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? mockMenuItems 
    : mockMenuItems.filter(item => item.category === activeCategory);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-display font-semibold text-center mb-8 text-gray-900">
          Nuestro Menú
        </h1>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-display font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <span className="text-lg font-semibold text-primary-500">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">
                  {categories.find(cat => cat.id === item.category)?.name}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default MenuPage;