import { Link, useLocation, useNavigate } from 'react-router-dom';

const MainNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path ? 'text-red-700' : 'text-gray-800 hover:text-red-700';
  };

  const handleJourneyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const savedStory = localStorage.getItem('selectedStory');
    
    if (savedStory) {
      // Wenn bereits eine Story ausgewählt wurde, direkt zur Journey
      navigate(`/journey?story=${savedStory}`);
    } else {
      // Ansonsten zur Home-Page für Story-Auswahl
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <Link to="/landing" className="mb-5">
        <img 
          src="/images/DATAGROUP-logo-standard.png" 
          alt="DATAGROUP Logo" 
          className="w-[100px]"
        />
      </Link>
      
      <nav className="flex justify-center gap-5">
        <a 
          href="#"
          onClick={handleJourneyClick}
          className={`${isActive('/journey')} text-lg font-bold transition-colors cursor-pointer`}
        >
          Dein Abenteuer
        </a>
        <Link 
          to="/marketplace" 
          className={`${isActive('/marketplace')} text-lg font-bold transition-colors`}
        >
          Marktplatz
        </Link>
        <Link 
          to="/profile" 
          className={`${isActive('/profile')} text-lg font-bold transition-colors`}
        >
          Profil
        </Link>
        <Link 
          to="/lifepoints" 
          className={`${isActive('/lifepoints')} text-lg font-bold transition-colors`}
        >
          Aktions-Chat
        </Link>
        <Link 
          to="/scoreboard" 
          className={`${isActive('/scoreboard')} text-lg font-bold transition-colors`}
        >
          Scoreboard
        </Link>
      </nav>
    </div>
  );
};

export default MainNav;