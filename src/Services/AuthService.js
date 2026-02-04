export const getAccessToken = async () => {
  const apiKey = import.meta.env.VITE_AMADEUS_CLIENT_ID;
  const apiSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

  if (!apiKey || !apiSecret) {
    console.error(" Missing credentials in .env file");
    throw new Error("Missing API credentials.");
  }

  try {
    const response = await fetch("/api/v1/security/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: apiKey,
        client_secret: apiSecret,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(" Amadeus Error Details:", errorData);

      throw new Error(
        `Auth Failed (${response.status}): ${errorData.error_description || errorData.error}`,
      );
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Network or Fetch Error:", error);
    throw error;
  }
};
