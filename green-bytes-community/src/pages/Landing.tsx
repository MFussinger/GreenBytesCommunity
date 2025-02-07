const Landing = () => {
    return (
      <div className="min-h-screen bg-[url('/images/augen.jpg')] bg-center bg-cover flex items-center justify-center">
        <div className="w-4/5 max-w-3xl bg-white/90 p-8 rounded-xl shadow-lg">
          <header className="flex justify-center mb-5">
            <div className="w-32">
              <img src="/images/DATAGROUP-logo-standard.png" alt="DATAGROUP Firmenlogo" className="w-full" />
            </div>
          </header>
          
          <nav className="mb-5">
            <div className="flex justify-center gap-8">
              <a href="#" className="text-xl font-bold text-gray-800 hover:text-red-700 transition-colors">
                Deine Reise
              </a>
              <a href="#" className="text-xl font-bold text-gray-800 hover:text-red-700 transition-colors">
                Marktplatz
              </a>
              <a href="#" className="text-xl font-bold text-gray-800 hover:text-red-700 transition-colors">
                Profil
              </a>
              <a href="#" className="text-xl font-bold text-gray-800 hover:text-red-700 transition-colors">
                Life Points
              </a>
            </div>
          </nav>
          
          <div className="text-lg font-bold text-gray-600">
            Deine Punktzahl: xx
          </div>
        </div>
      </div>
    );
  };
  
  export default Landing;