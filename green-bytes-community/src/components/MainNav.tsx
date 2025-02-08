import { Link, useLocation } from 'react-router-dom';

const MainNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path ? 'text-red-700' : 'text-gray-800 hover:text-red-700';
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
        <Link 
          to="/journey" 
          className={`${isActive('/journey')} text-lg font-bold transition-colors`}
        >
          Dein Abenteuer
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
          Punkte Chat
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