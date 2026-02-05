// export const getAccessToken = async () => {
//   try {
//     const response = await fetch("/api/v1/security/oauth2/token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: new URLSearchParams({
//         grant_type: "client_credentials",
//         client_id: import.meta.env.VITE_AMADEUS_CLIENT_ID,
//         client_secret: import.meta.env.VITE_AMADEUS_CLIENT_SECRET,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error(" Amadeus Error Details:", errorData);

//       throw new Error(
//         `Auth Failed (${response.status}): ${errorData.error_description || errorData.error}`,
//       );
//     }

//     const data = await response.json();
//     return data.access_token;
//   } catch (error) {
//     console.error("Network or Fetch Error:", error);
//     throw error;
//   }
// };

export const getAccessToken = async () => {
  const response = await fetch("/api/auth");

  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }

  const data = await response.json();
  return data.token;
};
