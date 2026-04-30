import { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { getCountries } from "../services/api";

function CountriesList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("countries");

    if (stored) {
      setCountries(JSON.parse(stored));
      setLoading(false);
    } else {
      const load = async () => {
        try {
          const data = await getCountries();
          setCountries(data);
        } catch {
          setError("Failed to load countries");
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, []);

  const deleteCountry = (code) => {
    const updated = countries.filter((c) => c.cca3 !== code);
    setCountries(updated);
    localStorage.setItem("countries", JSON.stringify(updated));
  };

  const updateCountry = (code, name, pop) => {
    const updated = countries.map((c) =>
      c.cca3 === code
        ? { ...c, name: { ...c.name, common: name }, population: Number(pop) }
        : c,
    );
    setCountries(updated);
    localStorage.setItem("countries", JSON.stringify(updated));
  };

  const sortName = () =>
    setCountries(
      [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common)),
    );

  const sortAsc = () =>
    setCountries([...countries].sort((a, b) => a.population - b.population));

  const sortDesc = () =>
    setCountries([...countries].sort((a, b) => b.population - a.population));

  if (loading) return <Loader />;
  if (error) return <EmptyState message={error} />;
  if (!countries.length) return <EmptyState message="No countries found" />;

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl text-primary text-center font-bold mb-5">
        🌍 Countries App
      </h1>

      <div className="flex justify-center gap-3 mb-5">
        <button className="btn" onClick={sortName}>
          Name
        </button>
        <button className="btn" onClick={sortAsc}>
          Pop ↑
        </button>
        <button className="btn" onClick={sortDesc}>
          Pop ↓
        </button>
      </div>

      <div className="flex flex-wrap gap-5 justify-center">
        {countries.map((c) => (
          <CountryCard
            key={c.cca3}
            country={c}
            onDelete={deleteCountry}
            onUpdate={updateCountry}
          />
        ))}
      </div>
    </div>
  );
}

export default CountriesList;
