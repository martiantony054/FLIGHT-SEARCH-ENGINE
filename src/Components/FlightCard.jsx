import { Clock, Plane } from "lucide-react";

function FlightCard({
  airline,
  departureTime,
  arrivalTime,
  duration,
  stopsCount,
  stopCities,
  price,
  origin,
  destination,
  onSelect,
}) {
  const stopsText =
    stopsCount === 0
      ? "Non-stop"
      : `${stopsCount} stop${stopsCount > 1 ? "s" : ""}`;

  return (
    <div className="bg-white rounded-xl  p-5 hover:shadow-md transition  shadow-2xl">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{airline}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div>
              <p className="text-xl font-bold">{departureTime}</p>
              <p className="text-xs">{origin}</p>
            </div>

            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-1 text-xs">
                <Clock className="w-3 h-3" />
                {duration}
              </div>
              <p className="text-xs mt-1">{stopsText}</p>
              {stopCities.length > 0 && (
                <p className="text-[11px] text-blue-600">
                  Via {stopCities.join(", ")}
                </p>
              )}
            </div>

            <div>
              <p className="text-xl font-bold">{arrivalTime}</p>
              <p className="text-xs">{destination}</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            ${price.toFixed(2)}
          </p>
          <button
            onClick={onSelect}
            className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightCard;
