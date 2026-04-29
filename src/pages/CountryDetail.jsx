import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(undefined);
  const [borderCountries, setBorderCountries] = useState([]);

  const themeColor = "#00A0D7";

  useEffect(() => {
    setCountry(undefined);
    setBorderCountries([]);

    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        let current;

        //  Handle both formats (array OR object)
        if (Array.isArray(data)) {
          current = data[0];
        } else {
          current = data;
        }

        if (!current || !current.name) {
          setCountry(null);
          return;
        }

        setCountry(current);

        //  Fetch border countries safely
        if (current?.borders?.length > 0) {
          fetch(
            `https://restcountries.com/v3.1/alpha?codes=${current.borders.join(",")}`,
          )
            .then((res) => res.json())
            .then((bdata) => {
              if (Array.isArray(bdata)) {
                setBorderCountries(bdata);
              } else {
                setBorderCountries([]);
              }
            })
            .catch(() => setBorderCountries([]));
        }
      })
      .catch(() => {
        setCountry(null);
      });
  }, [code]);

  // Error state
  if (country === null) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
         Country not found
      </p>
    );
  }

  // Loading state
  if (!country) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Back */}
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "8px 12px",
          marginBottom: "20px",
          cursor: "pointer",
          background: themeColor,
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        ⬅ Back
      </button>

      <h1 style={{ color: themeColor }}>{country.name?.common}</h1>

      <img
        src={country.flags?.png}
        alt={country.name?.common}
        width="300"
        style={{
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      />

      <div
        style={{
          marginTop: "20px",
          background: "#fff",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <p>
          <strong>Population:</strong> {country.population?.toLocaleString()}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Capital:</strong> {country.capital?.[0]}
        </p>
      </div>

      {/*  Map */}
      <iframe
        title="map"
        width="100%"
        height="300"
        style={{ marginTop: "20px", borderRadius: "10px" }}
        src={`https://www.google.com/maps?q=${country.name.common}&output=embed`}
      ></iframe>

      {/*  Borders */}
      <h3 style={{ marginTop: "20px", color: themeColor }}>Border Countries</h3>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {borderCountries.length > 0 ? (
          borderCountries.map((b) => (
            <button
              key={b.cca3}
              onClick={() => navigate(`/country/${b.cca3}`)}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                borderRadius: "5px",
                border: "1px solid #ddd",
                background: "#fff",
              }}
            >
              {b.name?.common}
            </button>
          ))
        ) : (
          <p>No Border Countries</p>
        )}
      </div>
    </div>
  );
}

export default CountryDetail;
