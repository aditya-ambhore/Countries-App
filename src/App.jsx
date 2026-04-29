import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountriesList from "./pages/CountriesList";
import CountryDetail from "./pages/CountryDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountriesList />} />
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
