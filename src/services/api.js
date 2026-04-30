const BASE_URL = "https://restcountries.com/v3.1";

export const getCountries = async () => {
  const res = await fetch(`${BASE_URL}/all?fields=name,population,flags,cca3`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
};

export const getCountry = async (code) => {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
};

export const getBorders = async (codes) => {
  const res = await fetch(`${BASE_URL}/alpha?codes=${codes.join(",")}`);
  if (!res.ok) throw new Error("Border error");
  return res.json();
};