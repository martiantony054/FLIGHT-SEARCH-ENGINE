import { useState } from "react";
import { Plane, Calendar} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchFlights } from "./Services/FlightApi";
import SearchForm from "./Components/SearchForm";
import FlightResults from "./Components/FlightResults";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import FlightReview from "./Components/FlightReview";

function App() {
  const [flights, setFlights] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSearch = async (data) => {
    setIsLoading(true);
    setSearchParams(data);
    setSelectedFlight(null);

    try {
      const results = await searchFlights(data);
      setFlights(results);
    } catch (error) {
      console.error("Search failed", error);
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleBack = () => {
    setSelectedFlight(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50">
      <Navbar />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          {!selectedFlight ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border-2 border-blue-600 text-blue-600 font-semibold text-sm">
                        <Plane className="w-4 h-4" />
                        Flights
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <SearchForm onSearch={handleSearch} isLoading={isLoading} />
                  </div>
                </div>
              </div>
              {searchParams && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {flights.length > 0 && (
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-slate-800">
                          {flights.length} Flights Found
                        </h2>
                        <p className="text-sm text-slate-500">
                          {searchParams.origin} → {searchParams.destination}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span>{searchParams.departureDate}</span>
                      </div>
                    </div>
                  )}

                  <FlightResults
                    flights={flights}
                    origin={searchParams.origin}
                    destination={searchParams.destination}
                    departureDate={searchParams.departureDate}
                    returnDate={searchParams.returnDate}
                    onSelectFlight={handleSelectFlight}
                  />
                </motion.div>
              )}
              {isLoading && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                  <div className="flex flex-col items-center justify-center py-20 px-6">
                    <motion.div
                      animate={{
                        x: [0, 100, 0],
                        rotate: [0, 0, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mb-8 relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 blur-2xl opacity-30 rounded-full" />
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl relative transform -rotate-45">
                        <Plane className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      Searching for best flights...
                    </h3>
                    <p className="text-slate-500 text-sm mb-6">
                      Comparing prices from 200+ airlines
                    </p>

                    <div className="flex gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-blue-600 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            selectedFlight && (
              <FlightReview selflight={selectedFlight} onback={handleBack} />
            )
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
export default App;
