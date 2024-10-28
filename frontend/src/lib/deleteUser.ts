export const deleteUser = async (email: string) => {
  const authResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/delete`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
    }
  );
  return await authResponse.json();
};
