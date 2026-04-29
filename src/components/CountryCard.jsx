import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CountryCard({ country, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(country.name?.common);
  const [population, setPopulation] = useState(country.population);

  const navigate = useNavigate();

  const handleSave = () => {
    onUpdate(country.cca3, name, population);
    setIsEditing(false);
  };

  const themeColor = "#00A0D7";

  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        padding: "12px",
        width: "200px",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "0.3s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {/* NAVIGATION AREA */}
      <div
        onClick={() => navigate(`/country/${country.cca3}`)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={country.flags?.png}
          alt={country.name?.common}
          style={{
            width: "100%",
            height: "120px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        {!isEditing && (
          <div style={{ marginTop: "8px" }}>
            <h3 style={{ margin: "5px 0", color: themeColor }}>
              {country.name?.common}
            </h3>
            <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
              Population: {country.population.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* EDIT SECTION */}
      {isEditing ? (
        <div style={{ marginTop: "10px" }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "6px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="number"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
            style={{
              width: "100%",
              padding: "6px",
              marginBottom: "6px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={handleSave}
            style={{
              width: "100%",
              padding: "6px",
              backgroundColor: themeColor,
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          style={{
            marginTop: "10px",
            width: "100%",
            padding: "6px",
            backgroundColor: themeColor,
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Edit
        </button>
      )}

      {/*  DELETE */}
      <button
        onClick={() => onDelete(country.cca3)}
        style={{
          marginTop: "8px",
          width: "100%",
          padding: "6px",
          backgroundColor: "#ff4d4d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default CountryCard;
