import { Link } from 'react-router-dom';

const MainNav = () => {
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
        <Link to="/journey" className="text-gray-800 text-lg font-bold hover:text-red-700 transition-colors">
          Deine Reise
        </Link>
        <Link to="/marketplace" className="text-gray-800 text-lg font-bold hover:text-red-700 transition-colors">
          Marktplatz
        </Link>
        <Link to="/profile" className="text-gray-800 text-lg font-bold hover:text-red-700 transition-colors">
          Profil
        </Link>
        <Link to="/lifepoints" className="text-gray-800 text-lg font-bold hover:text-red-700 transition-colors">
          Life Points
        </Link>
      </nav>
    </div>
  );
};

export default MainNav;