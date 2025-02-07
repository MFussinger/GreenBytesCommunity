import { useSearchParams } from 'react-router-dom';
import MainNav from '../components/MainNav';

const Landing = () => {
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get('story');

  const getStoryDetails = (id: string | null) => {
    switch (id) {
      case '1':
        return {
          title: "Mittelalterliche Fantasy-Welt",
          description: "Willkommen in einer Welt voller Magie und Abenteuer. Hier kannst du als tapferer Held die Umwelt durch magische und traditionelle Methoden schützen.",
          imagePath: '/images/fantasy.jpeg'
        };
      case '2':
        return {
          title: "Dystopische Cyberpunk-Welt",
          description: "In einer Welt der Zukunft, wo Technologie und Umwelt im Konflikt stehen, bist du der Schlüssel zur nachhaltigen Revolution.",
          imagePath: '/images/cyber.jpeg'
        };
      case '3':
        return {
          title: "Tief im weiten Weltall",
          description: "Als einsamer Raumfahrer trägst du die Verantwortung, die letzten Ressourcen der Menschheit zu bewahren und neue nachhaltige Welten zu entdecken.",
          imagePath: '/images/weltall.jpeg'
        };
      default:
        return {
          title: "Wähle deine Geschichte",
          description: "Kehre zur Startseite zurück und wähle dein Abenteuer.",
          imagePath: '/images/DATAGROUP-logo-standard.png'
        };
    }
  };

  const story = getStoryDetails(storyId);

  return (
    <div className="min-h-screen bg-[url('/images/augen.jpg')] bg-center bg-cover flex items-center justify-center">
      <div className="w-4/5 max-w-3xl bg-white/90 p-8 rounded-xl shadow-lg">
        <MainNav />
        
        <div className="space-y-6">
          <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
            <img
              src={story.imagePath}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h2 className="absolute bottom-4 left-4 right-4 text-3xl font-bold text-white">
              {story.title}
            </h2>
          </div>
          
          <p className="text-lg text-gray-600 text-center">
            {story.description}
          </p>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/journey'}
              className="px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors font-bold"
            >
              Starte dein Abenteuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;