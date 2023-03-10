import './index.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Builder from "./app/Builder";
import Home from "./app/Home";
import Login from "./app/Login";
import Register from "./app/Register";
import Dashboard from "./app/Dashboard";
import GenerateSite from "./app/SiteGenerator";
import SiteBuilder from './app/SiteBuilder';
import SiteView from './app/SiteView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/sites/:siteID" element={<SiteBuilder />} />

        <Route path="/view/:siteID" element={<SiteView />} />

        <Route path="/new" element={<GenerateSite />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/build" element={<Builder />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);