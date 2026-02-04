// api/search-cities.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { keyword } = req.query;

  if (!keyword || keyword.length < 2) {
    return res.status(400).json({ error: 'Keyword must be at least 2 characters' });
  }

  try {
    // Get token
    const tokenRes = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      return res.status(tokenRes.status).json(tokenData);
    }

    // Search cities
    const params = new URLSearchParams({
      keyword,
      subType: 'CITY,AIRPORT',
      'page[limit]': '30',
    });

    const response = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: 'application/vnd.amadeus+json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ City search failed:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('❌ Search error:', error);
    return res.status(500).json({ error: error.message });
  }
}