import { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";

function CountriesList() {
  const [countries, setCountries] = useState([]);

  //  Load data (localStorage OR API)
  useEffect(() => {
    const stored = localStorage.getItem("countries");

    if (stored) {
      setCountries(JSON.parse(stored));
    } else {
      fetch(
        "https://restcountries.com/v3.1/all?fields=name,population,flags,cca3",
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCountries(data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  //  Delete country
  const deleteCountry = (code) => {
    const filtered = countries.filter((c) => c.cca3 !== code);
    setCountries(filtered);
    localStorage.setItem("countries", JSON.stringify(filtered));
  };

  //  Update country
  const updateCountry = (code, newName, newPopulation) => {
    const updated = countries.map((c) =>
      c.cca3 === code
        ? {
            ...c,
            name: { ...c.name, common: newName },
            population: Number(newPopulation),
          }
        : c,
    );

    setCountries(updated);
    localStorage.setItem("countries", JSON.stringify(updated));
  };

  //  Sort by Name
  const sortByName = () => {
    const sorted = [...countries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common),
    );
    setCountries(sorted);
  };

  //  Sort Population Low → High
  const sortByPopulationAsc = () => {
    const sorted = [...countries].sort((a, b) => a.population - b.population);
    setCountries(sorted);
  };

  //  Sort Population High → Low
  const sortByPopulationDesc = () => {
    const sorted = [...countries].sort((a, b) => b.population - a.population);
    setCountries(sorted);
  };

  //  Theme Color
  const themeColor = "#00A0D7";

  //  Button Style (IMPROVED)
  const buttonStyle = {
    padding: "10px 14px",
    backgroundColor: themeColor,
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    margin: "5px",
    transition: "0.3s",
    fontWeight: "500",
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "#f5f7fa",
        minHeight: "100vh",
        paddingBottom: "40px",
      }}
    >
      {/*  HEADER */}
      <h1
        style={{
          color: themeColor,
          textAlign: "center",
          paddingTop: "20px",
          marginBottom: "10px",
        }}
      >
        Countries App
      </h1>

      {/*  SORT BUTTONS */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          style={buttonStyle}
          onClick={sortByName}
          onMouseOver={(e) => (e.target.style.opacity = 0.8)}
          onMouseOut={(e) => (e.target.style.opacity = 1)}
        >
          Sort By Name
        </button>

        <button
          style={buttonStyle}
          onClick={sortByPopulationAsc}
          onMouseOver={(e) => (e.target.style.opacity = 0.8)}
          onMouseOut={(e) => (e.target.style.opacity = 1)}
        >
          Population ↑
        </button>

        <button
          style={buttonStyle}
          onClick={sortByPopulationDesc}
          onMouseOver={(e) => (e.target.style.opacity = 0.8)}
          onMouseOut={(e) => (e.target.style.opacity = 1)}
        >
          Population ↓
        </button>
      </div>

      {/*  COUNTRY LIST */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {countries.length > 0 ? (
          countries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
              onDelete={deleteCountry}
              onUpdate={updateCountry}
            />
          ))
        ) : (
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "#666",
              fontSize: "18px",
            }}
          >
            Loading countries...
          </p>
        )}
      </div>
    </div>
  );
}

export default CountriesList;
