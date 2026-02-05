export default async function handler(req, res) {
  const { keyword } = req.query;

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

  const tokenData = await tokenRes.json();

  const params = new URLSearchParams({
    keyword,
    subType: "CITY,AIRPORT",
    "page[limit]": "30",
  });

  const response = await fetch(
    `https://test.api.amadeus.com/v1/reference-data/locations?${params}`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/vnd.amadeus+json",
      },
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
