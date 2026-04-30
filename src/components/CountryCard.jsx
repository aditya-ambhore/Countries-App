import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CountryCard({ country, onDelete, onUpdate }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(country.name.common);
  const [pop, setPop] = useState(country.population);

  const navigate = useNavigate();

  const save = () => {
    onUpdate(country.cca3, name, pop);
    setEdit(false);
  };

  return (
    <div className="bg-white w-56 p-3 rounded-xl shadow hover:scale-105 transition">
      
      <div onClick={() => navigate(`/country/${country.cca3}`)} className="cursor-pointer">
        <img src={country.flags.png} className="h-28 w-full object-cover rounded" />

        {!edit && (
          <>
            <h3 className="text-primary font-semibold mt-2">
              {country.name.common}
            </h3>
            <p className="text-sm text-gray-500">
              Population: {country.population.toLocaleString()}
            </p>
          </>
        )}
      </div>

      {edit ? (
        <>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input" type="number" value={pop} onChange={(e) => setPop(e.target.value)} />

          <button className="btn w-full mt-2" onClick={save}>Save</button>
        </>
      ) : (
        <button className="btn w-full mt-2" onClick={() => setEdit(true)}>Edit</button>
      )}

      <button
        className="bg-red-500 text-white w-full mt-2 p-1 rounded"
        onClick={() => onDelete(country.cca3)}
      >
        Delete
      </button>
    </div>
  );
}

export default CountryCard;