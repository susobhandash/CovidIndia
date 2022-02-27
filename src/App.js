import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VaccineCount from "./pages/vaccineCount";
import TopBar from './pages/topbar';
import CovidStats from './pages/covidStats';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopBar />}>
          <Route index element={<VaccineCount />} />
          <Route path="stats" element={<CovidStats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}