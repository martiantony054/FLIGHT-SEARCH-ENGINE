export const searchCities = async (keyword, accessToken = null) => {
  if (!keyword || keyword.length < 2) return [];

  try {
    const response = await fetch(
      `https://flight-search-eng.netlify.app/api/v1/reference-data/locations?keyword=${encodeURIComponent(keyword)}&subType=CITY,AIRPORT&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

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
