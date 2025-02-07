import { Alert, AlertDescription } from '@/components/ui/alert';
import { useState } from 'react';

const Home = () => {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);

  const handleBubbleClick = (number: number) => {
    setSelectedAlert(number);
    setTimeout(() => setSelectedAlert(null), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold mb-4">Willkommen</h1>
      
      <div className="w-full max-w-2xl">
        <img 
          src="/api/placeholder/800/400" 
          alt="Example" 
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      <div className="flex gap-4 justify-center w-full mt-8">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => handleBubbleClick(num)}
            className="bg-white p-6 rounded-full shadow-lg hover:shadow-xl transition-shadow text-xl w-24 h-24 flex items-center justify-center"
          >
            Option {num}
          </button>
        ))}
      </div>

      {selectedAlert !== null && (
        <Alert className="fixed bottom-4 right-4 w-64">
          <AlertDescription>
            You selected option {selectedAlert}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Home;