export const getAccessToken = async () => {
  try {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grant_type: 'client_credentials' }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(' Auth Error:', errorData);
      throw new Error(`Auth Failed: ${errorData.error_description || errorData.error}`);
    }

    const data = await response.json();
    console.log('✅ Token received');
    return data.access_token;
  } catch (error) {
    console.error('Auth Error:', error);
    throw error;
  }
};
