export default async function handler(req, res) {
  const tokenRes = await fetch(
    "https://api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET,
      }),
    }
  );

  const tokenData = await tokenRes.json();

  const response = await fetch(
    `https://api.amadeus.com/v2/shopping/flight-offers?${req.query}`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
