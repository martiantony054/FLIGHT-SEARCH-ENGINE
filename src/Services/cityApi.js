// src/services/searchcities.js
import { getAccessToken } from './AuthService';

export const searchCities = async (keyword) => {
  if (!keyword || keyword.length < 2) return [];

  try {
    const token = await getAccessToken();
    
    console.log('🔍 Searching cities with keyword:', keyword);
    console.log('🔑 Token exists:', !!token);
    
    const params = new URLSearchParams({
      keyword,
      subType: 'CITY,AIRPORT',
      'page[limit]': '30',
    });

    const url = `https://test.api.amadeus.com/v1/reference-data/locations?${params}`;
    console.log('📡 Request URL:', url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.amadeus+json',
      },
    });

    console.log('📊 Response status:', response.status);
    console.log('📊 Response ok:', response.ok);

    // Check if response has content
    const contentType = response.headers.get('content-type');
    console.log('📄 Content-Type:', contentType);

    if (!response.ok) {
      // Try to get error text
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      
      try {
        const errorData = JSON.parse(errorText);
        console.error('❌ Error data:', errorData);
      } catch (e) {
        console.error('❌ Could not parse error as JSON');
      }
      
      throw new Error(`City search failed: ${response.status}`);
    }

    // Get response text first
    const responseText = await response.text();
    console.log('📝 Response text length:', responseText.length);

    if (!responseText) {
      console.error('❌ Empty response received');
      return [];
    }

    const data = JSON.parse(responseText);
    console.log('✅ Parsed data:', data);

    return (data.data || []).map((item) => ({
      name: item.name,
      code: item.iataCode,
      country: item.address?.countryCode || '',
      city: item.address?.cityName || item.name,
      type: item.subType,
    }));
  } catch (error) {
    console.error('❌ Failed to fetch cities:', error);
    console.error('❌ Error details:', error.message);
    return [];
  }
};