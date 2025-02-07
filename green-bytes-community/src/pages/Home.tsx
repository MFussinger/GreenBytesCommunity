import { useState } from 'react';

const Home = () => {
  const [selectedBubble, setSelectedBubble] = useState<number | null>(null);

  const options = [
    { id: 1, text: "Das ist Option 1" },
    { id: 2, text: "Das ist Option 2" },
    { id: 3, text: "Das ist Option 3" }
  ];

  const handleBubbleClick = (number: number) => {
    alert(`You selected ${number}`);
    setSelectedBubble(number);
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <h1 className="text-3xl font-bold">Willkommen</h1>
      
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
        <img 
          src="/dein-bild.png"
          alt="DG Logo" 
          className="w-full rounded-lg shadow-lg"
        />
        <p className="text-center text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>

      <div className="flex gap-6 justify-center">
        {options.map(({ id, text }) => (
          <div key={id} className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleBubbleClick(id)}
              className={`
                w-24 h-24 rounded-full bg-blue-500 text-white
                flex items-center justify-center text-xl font-semibold
                transform transition-all hover:scale-105 hover:bg-blue-600
                ${selectedBubble === id ? 'ring-4 ring-blue-300' : ''}
              `}
            >
              {id}
            </button>
            <p className="text-center text-sm text-gray-600 max-w-[150px]">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;