import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  userId: string;
  createdAt: string;
  state: 'available' | 'sold';
  description: string;
  price: number;
}

const Marketplace = () => {
  const navigate = useNavigate();
  
  const products: Product[] = [
    {
      id: 1,
      title: "Premium Green Bytes Paket",
      userId: "user123",
      createdAt: "2024-02-07",
      state: "available",
      description: "Das Premium Green Bytes Paket enthält exklusive Inhalte.",
      price: 29.99
    },
    {
      id: 2,
      title: "Deluxe Adventure Pack",
      userId: "user456",
      createdAt: "2024-02-06",
      state: "available",
      description: "Ein komplettes Paket für fortgeschrittene Abenteurer.",
      price: 49.99
    }
  ];

  return (
    <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <header className="flex flex-col items-center mb-8">
          <div className="w-40">
            <img 
              src="/images/DATAGROUP-logo-standard.png" 
              alt="DATAGROUP Firmenlogo" 
              className="w-full"
            />
          </div>
        </header>

        <nav className="flex justify-center gap-8 my-8">
          <Link to="/journey" className="text-white font-bold hover:text-red-700 transition-colors">
            Deine Reise
          </Link>
          <Link to="/marketplace" className="text-white font-bold hover:text-red-700 transition-colors">
            Marktplatz
          </Link>
          <Link to="/profile" className="text-white font-bold hover:text-red-700 transition-colors">
            Profil
          </Link>
          <Link to="/lifepoints" className="text-white font-bold hover:text-red-700 transition-colors">
            Life Points
          </Link>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/80 rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src="/images/DATAGROUP-logo-standard.png"
                alt={product.title}
                className="w-full h-48 object-contain"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Erstellt am: {new Date(product.createdAt).toLocaleDateString('de-DE')}
                </p>
                <p className="text-lg text-red-700 mb-2">
                  €{product.price.toFixed(2)}
                </p>
                <span className={`text-sm ${
                  product.state === 'available' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.state === 'available' ? 'Verfügbar' : 'Verkauft'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;