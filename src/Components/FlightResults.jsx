import { useState, useMemo } from "react";
import FlightCard from "./FlightCard";
import PriceGraph from "./PriceGraph";
import { Filter } from "lucide-react";

function FlightResults({ flights, origin, destination, onSelectFlight }) {
  const [sortBy, setSortBy] = useState("price");

  const sortedFlights = useMemo(() => {
    return [...flights].sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "duration") {
        const durA = parseInt(a.duration) || 0;
        const durB = parseInt(b.duration) || 0;
        return durA - durB;
      }
      if (sortBy === "departure") {
        return (
          new Date(a.departureTime).getTime() -
          new Date(b.departureTime).getTime()
        );
      }
      return 0;
    });
  }, [flights, sortBy]);

  if (!flights || flights.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No flights found for your search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {flights.length} Flights Found
          </h2>
          <p className="text-sm text-gray-500">
            {origin} to {destination}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
          >
            <option value="price">Sort by: Price</option>
            <option value="duration">Sort by: Duration</option>
            <option value="departure">Sort by: Departure</option>
          </select>
        </div>
      </div>

      <PriceGraph flights={flights} />

      <div className="space-y-4">
  {sortedFlights.map((flight) => (
    <FlightCard
      key={flight.id}
      airline={flight.airline}
      departureTime={flight.departureTime}
      arrivalTime={flight.arrivalTime}
      duration={flight.duration}
      stopsCount={flight.stopsCount}
      stopCities={flight.stopCities}
      price={flight.price}
      origin={flight.origin}
      destination={flight.destination}
      onSelect={() => onSelectFlight(flight)}
    />
  ))}
</div>

    </div>
  );
}

export default FlightResults;
