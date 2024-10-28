export const getAuthorizationInformation = async (
  baseUrl: string,
  token: string
) => {
  const url = baseUrl.split("/")[2];
  const protocol = baseUrl.split("/")[0];
  const authResponse = await fetch(`${protocol}//${url}/api/auth`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await authResponse.json();
};
