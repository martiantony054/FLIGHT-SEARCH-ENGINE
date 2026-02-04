import { Plane, TrendingDown, Shield } from 'lucide-react';
const Navbar = () => {
  return (
    <div>
       <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-lg  top-0 bottom-0 static ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-lg flex items-center justify-center shadow-md">
                <Plane className="w-6 h-6 text-blue-600 fill-current -rotate-45" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">SkySearch</h1>
                <p className="text-xs text-blue-100 font-medium">Best Prices Guaranteed</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">Lowest Fares</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Safe & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
