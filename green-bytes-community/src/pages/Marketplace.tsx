import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  tag: string;
}

const Marketplace = () => {
  const navigate = useNavigate();
  
  const products: Product[] = [
    {
      id: 1,
      name: "Produkt 1",
      price: 29.99,
      image: "/images/DATAGROUP-logo-standard.png",
      tag: "Verfügbar in begrenzter Anzahl"
    },
    {
      id: 2,
      name: "Produkt 2",
      price: 49.99,
      image: "/images/DATAGROUP-logo-standard.png",
      tag: "Kostenlose Lieferung"
    },
    {
      id: 3,
      name: "Produkt 3",
      price: 19.99,
      image: "/images/DATAGROUP-logo-standard.png",
      tag: "Jetzt bestellen!"
    },
    {
      id: 4,
      name: "Produkt 4",
      price: 89.99,
      image: "/images/DATAGROUP-logo-standard.png",
      tag: "Neu eingetroffen"
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
              onClick={() => {
                console.log(`Clicking product ${product.id}`);
                navigate(`/product/${product.id}`);
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-lg text-red-700">
                  €{product.price.toFixed(2)}
                </p>
                <span className="text-sm text-gray-600 mt-2 block">
                  {product.tag}
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