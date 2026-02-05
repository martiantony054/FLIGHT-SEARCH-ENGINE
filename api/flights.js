export default async function handler(req, res) {
  try {
    const tokenRes = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
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

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      return res.status(500).json({ error: "Token fetch failed", details: err });
    }

    const tokenData = await tokenRes.json();

    const params = new URLSearchParams(req.query).toString();

    const response = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?${params}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json(err);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Flight API failed", details: error.message });
  }
}
