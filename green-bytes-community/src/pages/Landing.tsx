import MainNav from '../components/MainNav';
const Landing = () => {
    return (
      <div className="min-h-screen bg-[url('/images/augen.jpg')] bg-center bg-cover flex items-center justify-center">
        <div className="w-4/5 max-w-3xl bg-white/90 p-8 rounded-xl shadow-lg">
        <MainNav />

          
          <div className="text-lg font-bold text-gray-600">
            Deine Punktzahl: xx
          </div>
        </div>
      </div>
    );
  };
  
  export default Landing;