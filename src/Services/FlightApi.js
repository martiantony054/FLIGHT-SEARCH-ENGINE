import { getAccessToken } from "./AuthService";

const getIataCode = (locationString) => {
  if (!locationString) return "";
  const match = locationString.match(/\(([^)]+)\)/);
  return match ? match[1] : locationString;
};

const formatDuration = (duration) => {
  if (!duration) return "";
  const hours = duration.match(/(\d+)H/)?.[1] || "0";
  const minutes = duration.match(/(\d+)M/)?.[1] || "0";
  return `${hours}h ${minutes}m`;
};
export const searchFlights = async (searchParams) => {
  const { origin, destination, departureDate, returnDate, adults, children } =
    searchParams;

  const originCode = getIataCode(origin);
  const destCode = getIataCode(destination);

  if (!originCode || !destCode) {
    throw new Error("Invalid origin or destination");
  }

  const token = await getAccessToken();

  const params = new URLSearchParams({
    originLocationCode: originCode,
    destinationLocationCode: destCode,
    departureDate,
    adults: adults || 1,
    currencyCode: "USD",
    max: 20,
  });

  if (children > 0) params.append("children", children);
  if (returnDate) params.append("returnDate", returnDate);

  const response = await fetch(
    `https://flight-search-eng.netlify.app/api/v2/shopping/flight-offers?${params.toString()}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }

  const data = await response.json();

  return data.data.map((offer) => {
    const itinerary = offer.itineraries[0];
    const segments = itinerary.segments;

    const stopsCount = segments.length - 1;
    const stopCities =
      stopsCount > 0
        ? segments.slice(0, -1).map((s) => s.arrival.iataCode)
        : [];

    const departureTime = new Date(segments[0].departure.at).toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" },
    );

    const arrivalTime = new Date(
      segments[segments.length - 1].arrival.at,
    ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return {
      id: offer.id,
      airline: segments[0].carrierCode,
      origin: originCode,
      destination: destCode,
      departureTime,
      arrivalTime,
      duration: formatDuration(itinerary.duration),
      price: Number(offer.price.total),
      stopsCount,
      stopCities,
      itineraries: offer.itineraries,
      priceBreakup: offer.price,
    };
  });
};

export const sortFlights = (flights, sortBy) => {
  const sortedFlights = [...flights];

  switch (sortBy) {
    case "price":
      return sortedFlights.sort((a, b) => a.price - b.price);

    case "duration":
      return sortedFlights.sort(
        (a, b) => a.durationMinutes - b.durationMinutes,
      );

    case "departure":
      return sortedFlights.sort((a, b) =>
        a.departureTime.localeCompare(b.departureTime),
      );

    default:
      return sortedFlights;
  }
};
export const searchCities = async (query, token) => {
  if (!query || query.length < 2) return [];

  try {
    const params = new URLSearchParams({
      keyword: query,
      subType: "CITY,AIRPORT",
      "page[limit]": "30",
    });

    const url = `https://flight-search-eng.netlify.app/api/v1/reference-data/locations?${params.toString()}`;

    console.log(`Fetching: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,

        Accept: "application/vnd.amadeus+json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Amadeus 400 Error Details:", errorText);
      throw new Error(`Failed to fetch cities: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
