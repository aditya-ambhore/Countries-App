import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { getCountry, getBorders } from "../services/api";

function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCountry(code);
        const current = Array.isArray(data) ? data[0] : data;

        if (!current) {
          setCountry(null);
          return;
        }

        setCountry(current);

        if (current?.borders?.length) {
          const b = await getBorders(current.borders);
          setBorders(b);
        }
      } catch {
        setCountry(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [code]);

  if (loading) return <Loader />;
  if (!country) return <EmptyState message="Country not found" />;

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <button className="btn mb-4" onClick={() => navigate("/")}>
        ⬅ Back
      </button>

      <h1 className="text-3xl text-primary font-bold">{country.name.common}</h1>

      <img src={country.flags.png} className="w-72 mt-3 rounded shadow" />

      <div className="bg-white p-4 mt-4 rounded shadow">
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Subregion: {country.subregion}</p>
        <p>Capital: {country.capital?.[0]}</p>

        <p>
          Languages:{" "}
          {country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A"}
        </p>

        <p>
          Currency:{" "}
          {country.currencies
            ? Object.values(country.currencies)
                .map((c) => c.name)
                .join(", ")
            : "N/A"}
        </p>
      </div>

      <iframe
        className="w-full h-72 mt-4 rounded"
        src={`https://www.google.com/maps?q=${country.name.common}&output=embed`}
      />

      <h3 className="mt-4 text-primary font-semibold">Border Countries</h3>

      <div className="flex gap-2 flex-wrap mt-2">
        {borders.length ? (
          borders.map((b) => (
            <button
              key={b.cca3}
              className="btn"
              onClick={() => navigate(`/country/${b.cca3}`)}
            >
              {b.name.common}
            </button>
          ))
        ) : (
          <p>No Borders</p>
        )}
      </div>
    </div>
  );
}

export default CountryDetail;
