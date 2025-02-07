import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample product data
  const product = {
    id: parseInt(id || '1'),
    name: "Premium Green Bytes Paket",
    price: 29.99,
    image: "/images/DATAGROUP-logo-standard.png",
    description: "Das Premium Green Bytes Paket enthält exklusive Inhalte und Vorteile für dein Abenteuer.",
    features: [
      "Zusätzliche 500 Life Points",
      "Exklusive Questline",
      "Besondere Ausrüstungsgegenstände",
      "VIP-Status in der Community"
    ],
    availability: "Sofort verfügbar",
    rating: 4.8
  };

  return (
    <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white/90 rounded-xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Produktbild */}
            <div className="md:flex-shrink-0 md:w-1/2">
              <img
                className="h-96 w-full object-contain p-8"
                src={product.image}
                alt={product.name}
              />
            </div>
            
            {/* Produktinfos */}
            <div className="p-8 md:w-1/2">
              <div className="flex justify-between items-start">
                <button 
                  onClick={() => navigate('/marketplace')}
                  className="text-gray-600 hover:text-gray-800 mb-4"
                >
                  ← Zurück zum Marktplatz
                </button>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
              
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(product.rating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">({product.rating} / 5)</span>
              </div>

              <p className="text-xl font-bold text-red-700 mb-6">
                €{product.price.toFixed(2)}
              </p>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2">Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Status: <span className="text-green-600">{product.availability}</span>
                </p>
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transform transition-all duration-300 hover:scale-105">
                  Jetzt kaufen
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