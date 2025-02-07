import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [selectedBubble, setSelectedBubble] = useState<number | null>(null);

  const options = [
    { id: 1, text: "Mittelalterliche Fantasy-Welt" },
    { id: 2, text: "Dystopische Cyberpunk-Welt" },
    { id: 3, text: "Tief im weiten Weltall - ganz allein?" }
  ];

  const handleBubbleClick = (number: number) => {
    setSelectedBubble(number);
    setTimeout(() => {
      navigate('/landing');
    }, 500);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center space-y-8 p-4">
      <h1 className="text-3xl font-bold">Green Bytes Community </h1>
      
      <div className="w-full flex flex-col items-center gap-4">
        <img 
          src="/images/DATAGROUP-logo-standard.png"
          alt="DG Logo" 
          className="w-full max-w-4xl rounded-lg shadow-lg"
        />
        <p className="text-center text-gray-600 max-w-4xl">
          Wähle deinen Weg um gemeinsam mit der DATAGROUP die Welt zu einem bessern Ort zu machen. 
          Green Bytes Community ist ein interaktives TextAdventure, dass dich dabei aktiv unterstützt und motiviert die besseren Entscheidungen zu treffen.
          Durch dein Handeln verdienst du dir Punkte, die du dazu nutzen kannst Aktionen in deinem Abenteur auszuführen.
          Wähle ein Universum und erlebe dein eigenes individuelles Abenteuer. 
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