import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [selectedBubble, setSelectedBubble] = useState<number | null>(null);

  const options = [
    { 
      id: 1, 
      text: "Mittelalterliche Fantasy-Welt",
      description: "Erlebe magische Abenteuer in einer Welt voller Mythen und Legenden",
      imagePath: '/images/fantasy.jpeg'
    },
    { 
      id: 2, 
      text: "Dystopische Cyberpunk-Welt",
      description: "Tauche ein in eine futuristische Welt zwischen Technologie und Umweltschutz",
      imagePath: '/images/cyber.jpeg'
    },
    { 
      id: 3, 
      text: "Tief im weiten Weltall",
      description: "Erkunde die unendlichen Weiten des Universums auf deiner einsamen Mission",
      imagePath: '/images/weltall.jpeg'
    }
  ];

  const handleBubbleClick = (number: number) => {
    setSelectedBubble(number);
    navigate(`/landing?story=${number}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center space-y-8 p-4 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mt-8">Green Bytes Community</h1>
      
      <div className="w-full flex flex-col items-center gap-6">
        <img 
          src="/images/DATAGROUP-logo-standard.png"
          alt="DG Logo" 
          className="w-64 mb-4"
        />
        <p className="text-center text-gray-600 max-w-4xl px-4">
          Wähle deinen Weg um gemeinsam mit der DATAGROUP die Welt zu einem besseren Ort zu machen. 
          Green Bytes Community ist ein interaktives TextAdventure, das dich dabei aktiv unterstützt und motiviert die besseren Entscheidungen zu treffen.
          Durch dein Handeln verdienst du dir Punkte, die du dazu nutzen kannst Aktionen in deinem Abenteuer auszuführen.
          Wähle ein Universum und erlebe dein eigenes individuelles Abenteuer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4 mt-8">
        {options.map(({ id, text, description, imagePath }) => (
          <div 
            key={id} 
            className={`
              relative overflow-hidden rounded-xl shadow-xl transition-all duration-300
              transform hover:scale-105 cursor-pointer
              ${selectedBubble === id ? 'ring-4 ring-blue-500' : ''}
            `}
            onClick={() => handleBubbleClick(id)}
          >
            <img
              src={imagePath}
              alt={text}
              className="w-full h-64 object-cover"
            />
            
            {/* Overlay mit Verlauf für bessere Lesbarkeit */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-4 mb-3">
                <div className={`
                  w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center
                  text-xl font-bold border-2 border-white
                `}>
                  {id}
                </div>
                <h3 className="text-xl font-bold">{text}</h3>
              </div>
              <p className="text-sm text-gray-200">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;