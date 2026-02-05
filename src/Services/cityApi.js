export const searchCities = async (keyword) => {
  if (!keyword || keyword.length < 2) return [];

  try {
    const params = new URLSearchParams({
      keyword,
      subType: "CITY,AIRPORT",
      "page[limit]": "30",
    });

    const response = await fetch(`/api/cities?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    return (data.data || []).map((item) => ({
      name: item.name,
      code: item.iataCode,
      country: item.address.countryCode,
    }));
  } catch (error) {
    console.error("Failed to fetch cities:", error);
    return [];
  }
};
