import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  userId: string;
  createdAt: string;
  state: 'available' | 'sold';
  description: string;
  price: number;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product: Product = {
    id: parseInt(id || '1'),
    title: "Premium Green Bytes Paket",
    userId: "user123",
    createdAt: "2024-02-07",
    state: "available",
    description: "Das Premium Green Bytes Paket enthält exklusive Inhalte und Vorteile für dein Abenteuer.",
    price: 29.99
  };

  return (
    <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/90 rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <img
                className="h-96 w-full object-contain p-8"
                src="/images/DATAGROUP-logo-standard.png"
                alt={product.title}
              />
            </div>
            
            <div className="p-8 md:w-1/2">
              <div className="flex justify-between items-start">
                <button 
                  onClick={() => navigate('/marketplace')}
                  className="text-gray-600 hover:text-gray-800 mb-4"
                >
                  ← Zurück zum Marktplatz
                </button>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  Erstellt am: {new Date(product.createdAt).toLocaleDateString('de-DE')}
                </p>

                <p className="text-gray-600">{product.description}</p>

                <p className="text-xl font-bold text-red-700">
                  €{product.price.toFixed(2)}
                </p>

                <p className="text-sm">
                  Status: {' '}
                  <span className={`${
                    product.state === 'available' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.state === 'available' ? 'Verfügbar' : 'Verkauft'}
                  </span>
                </p>

                <button 
                  className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold transform transition-all duration-300 hover:scale-105 ${
                    product.state === 'available' ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={product.state !== 'available'}
                >
                  {product.state === 'available' ? 'Jetzt kaufen' : 'Nicht verfügbar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;