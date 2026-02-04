export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { grant_type = 'client_credentials' } = req.body;

  const apiKey = process.env.AMADEUS_CLIENT_ID;  
  const apiSecret = process.env.AMADEUS_CLIENT_SECRET;

  if (!apiKey || !apiSecret) return res.status(500).json({ error: 'Server config error' });

  try {
    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {  // Use test/prod endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ grant_type, client_id: apiKey, client_secret: apiSecret }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    } 

    const data = await response.json();
    res.status(200).json({ access_token: data.access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
