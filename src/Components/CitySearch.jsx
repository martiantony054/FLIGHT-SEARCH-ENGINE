import { useState, useEffect, useRef } from "react";
import { MapPin, X, Loader2 } from "lucide-react";
// import { getAccessToken } from "../Services/AuthService";

function CitySearch({ label, value, onChange, placeholder, excludeCity }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);
  const fetchCities = async (searchTerm) => {
    const keyword = searchTerm?.trim(); 

    if (!keyword || keyword.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      // const token = await getAccessToken();

      const params = new URLSearchParams({
        keyword,
        subType: "CITY,AIRPORT",
        "page[limit]": "10", 
      });

      const response = await fetch(
        `/api/cities?${params.toString()}`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     Accept: "application/vnd.amadeus+json",
        //   },
        // },
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Amadeus 400 details:", text);
        throw new Error("City API failed");
      }

      const data = await response.json();

      const cities =
        data.data?.map((item) => ({
          name: item.name,
          iataCode: item.iataCode,
          detailedName: `${item.name} (${item.iataCode})`,
        })) || [];

      setSuggestions(
        excludeCity
          ? cities.filter((c) => c.detailedName !== excludeCity)
          : cities,
      );
    } catch (err) {
      console.error("City search error:", err);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchCities(query);
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, excludeCity]);

  const handleSelect = (city) => {
    onChange(city.detailedName);
    setQuery(city.detailedName);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full h-12 pl-10 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />

        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 animate-spin" />
        )}

        {!isLoading && query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((city, index) => (
            <button
              key={`${city.iataCode}-${index}`}
              type="button"
              onClick={() => handleSelect(city)}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 text-sm text-gray-700 transition-colors flex items-center gap-2"
            >
              <MapPin className="w-3 h-3 text-gray-400" />
              {city.detailedName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default CitySearch;
