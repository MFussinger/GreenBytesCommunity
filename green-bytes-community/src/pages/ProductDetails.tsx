// src/pages/ProductDetails.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { marketService, MarketItem } from '../services/marketService';
import { Loader2 } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<MarketItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const items = await marketService.getItems();
        const found = items.find(item => item.createdAt.toString() === id);
        
        if (found) {
          setProduct(found);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover flex items-center justify-center">
        <div className="bg-white/80 p-8 rounded-xl shadow-lg">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-2 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[url('/images/content.jpg')] bg-center bg-cover flex items-center justify-center">
        <div className="bg-white/80 p-8 rounded-xl shadow-lg text-center">
          <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
          <button 
            onClick={() => navigate('/marketplace')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

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