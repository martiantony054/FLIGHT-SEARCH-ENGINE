export default async function handler(res) {
  const response = await fetch(
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

  const data = await response.json();
  res.status(200).json({ token: data.access_token });
}
