import { useSearchParams } from 'react-router-dom';
import MainNav from '../components/MainNav';

const Landing = () => {
  const [searchParams] = useSearchParams();
  const storyId = searchParams.get('story');

  const getStoryText = (id: string | null) => {
    switch (id) {
      case '1':
        return {
          title: "Mittelalterliche Fantasy-Welt",
          description: "Willkommen in einer Welt voller Magie und Abenteuer. Hier kannst du als tapferer Held die Umwelt durch magische und traditionelle Methoden schützen."
        };
      case '2':
        return {
          title: "Dystopische Cyberpunk-Welt",
          description: "In einer Welt der Zukunft, wo Technologie und Umwelt im Konflikt stehen, bist du der Schlüssel zur nachhaltigen Revolution."
        };
      case '3':
        return {
          title: "Tief im weiten Weltall",
          description: "Als einsamer Raumfahrer trägst du die Verantwortung, die letzten Ressourcen der Menschheit zu bewahren und neue nachhaltige Welten zu entdecken."
        };
      default:
        return {
          title: "Wähle deine Geschichte",
          description: "Kehre zur Startseite zurück und wähle dein Abenteuer."
        };
    }
  };

  const story = getStoryText(storyId);

  return (
    <div className="min-h-screen bg-[url('/images/augen.jpg')] bg-center bg-cover flex items-center justify-center">
      <div className="w-4/5 max-w-3xl bg-white/90 p-8 rounded-xl shadow-lg">
        <MainNav />
        
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            {story.title}
          </h2>
          
          <p className="text-lg text-gray-600 text-center">
            {story.description}
          </p>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/journey'}
              className="px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors"
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