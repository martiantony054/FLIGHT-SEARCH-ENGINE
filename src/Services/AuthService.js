

export const getAccessToken = async () => {
  const apiKey = import.meta.env.VITE_AMADEUS_CLIENT_ID;
  const apiSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

  // DEBUG: Check if variables are loading
  console.log("Checking Env Vars...");
  console.log("Key exists:", !!apiKey);
  console.log("Secret exists:", !!apiSecret);

  if (!apiKey || !apiSecret) {
    console.error("❌ Missing credentials in .env file");
    throw new Error("Missing API credentials.");
  }

  try {
    const response = await fetch("https://flight-search-eng.netlify.app/api/v1/security/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: apiKey,
        client_secret: apiSecret,
      }),
    });

    // DEBUG: Log status code
    console.log("Response Status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      // This is the most important line - it tells you the specific Amadeus error
      console.error("❌ Amadeus Error Details:", errorData);
      
      throw new Error(
        `Auth Failed (${response.status}): ${errorData.error_description || errorData.error}`
      );
    }

    const data = await response.json();
    console.log("✅ Token received successfully");
    return data.access_token;
  } catch (error) {
    console.error("Network or Fetch Error:", error);
    throw error;
  }
};