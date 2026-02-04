import { useState } from "react";
import {
  Button,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Search as SearchIcon, ArrowRight, Users } from "lucide-react";
import { formatDate, isPastDate, isValidDateRange } from "../Utils/Dateutils";
import CitySearch from "./CitySearch";

function SearchForm({ onSearch, isLoading }) {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
    returnDate: formatDate(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)),
    adults: 1,
    children: 0,
  });

  const [tripType, setTripType] = useState("roundtrip");

  const isFormValid =
    formData.origin &&
    formData.destination &&
    formData.origin !== formData.destination &&
    formData.departureDate &&
    !isPastDate(formData.departureDate) &&
    isValidDateRange(formData.departureDate, formData.returnDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSearch(formData);
    }
  };

  const swapCities = () => {
    setFormData((prev) => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => setTripType("roundtrip")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            tripType === "roundtrip"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Round trip
        </button>
        <button
          type="button"
          onClick={() => setTripType("oneway")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            tripType === "oneway"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          One way
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-3">
          <CitySearch
            label="From"
            value={formData.origin}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, origin: value }))
            }
            placeholder="Origin city"
            excludeCity={formData.destination}
          />
        </div>

        <div className="lg:col-span-1 flex items-end justify-center pb-2">
          <button
            type="button"
            onClick={swapCities}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="lg:col-span-3">
          <CitySearch
            label="To"
            value={formData.destination}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, destination: value }))
            }
            placeholder="Destination city"
            excludeCity={formData.origin}
          />
        </div>

        <div className="lg:col-span-3 grid grid-cols-2 gap-2">
          <div>
            <InputLabel className="text-sm font-medium text-gray-700 mb-1 block">
              Departure
            </InputLabel>
            <input
              type="date"
              value={formData.departureDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  departureDate: e.target.value,
                }))
              }
              min={formatDate(new Date())}
              className="w-full h-12 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          {tripType === "roundtrip" && (
            <div>
              <InputLabel className="text-sm font-medium text-gray-700 mb-1 block">
                Return
              </InputLabel>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    returnDate: e.target.value,
                  }))
                }
                min={formData.departureDate}
                className="w-full h-12 px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <FormControl fullWidth className="h-12">
            <InputLabel>Travelers</InputLabel>
            <Select
              value={`${formData.adults}-${formData.children}`}
              label="Travelers"
              onChange={(e) => {
                const [adults, children] = e.target.value
                  .split("-")
                  .map(Number);
                setFormData((prev) => ({ ...prev, adults, children }));
              }}
              input={
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <Users className="w-4 h-4 text-gray-400" />
                    </InputAdornment>
                  }
                />
              }
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((adult) => (
                <MenuItem key={`${adult}-0`} value={`${adult}-0`}>
                  {adult} Adult{adult > 1 ? "s" : ""}
                </MenuItem>
              ))}

              {[1, 2, 3, 4].map((adult) => (
                <MenuItem key={`${adult}-1`} value={`${adult}-1`}>
                  {adult} Adult{adult > 1 ? "s" : ""}, 1 Child
                </MenuItem>
              ))}

              {[1, 2, 3, 4].map((adult) => (
                <MenuItem key={`${adult}-2`} value={`${adult}-2`}>
                  {adult} Adult{adult > 1 ? "s" : ""}, 2 Children
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid || isLoading}
          className="w-full h-12 font-medium text-base transition-all"
          sx={{ height: 48 }}
        >
          <SearchIcon className="w-5 h-5 mr-2" />
          {isLoading ? "Searching..." : "Search Flights"}
        </Button>
      </div>
    </form>
  );
}
export default SearchForm;
