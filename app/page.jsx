"use client";

import "./page.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; 
import axios from "axios"; // Importer axios pour faire des requêtes HTTP
import MiniMap from "@/components/MiniMap";
import Loader from "@/components/loader";

export default function Home() {
  const [city, setCity] = useState("Paris"); // Ville par défaut
  const [weather, setWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const API_KEY = "d53c6e875f28d342c4e2a372763d30fa"; // Remplacez par votre clé API

  // Fonction pour récupérer la météo actuelle
  const getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour récupérer les prévisions météo de la semaine
  const getWeeklyForecast = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    try {
      const response = await axios.get(url);
      setWeeklyForecast(response.data.list);
      // Ajoutez cette ligne pour définir les prévisions horaires
      setHourlyForecast(response.data.list.slice(0, 24));
    } catch (error) {
      console.error(error);
    }
  };

  // Appeler les fonctions lors du montage du composant
  useEffect(() => {
    getWeather();
    getWeeklyForecast();
  }, [city]);

  // Gérer la soumission du formulaire de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.city.value;
    setCity(inputValue);
  };

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 secondes de délai pour simuler le chargement
  }, []);

  if (loading) {
    return <Loader />;
  }

  const uniqueDays = {};
weeklyForecast.forEach((weather) => {
  const date = new Date(weather.dt * 1000).toDateString();
  if (!uniqueDays[date]) {
    uniqueDays[date] = weather;
  }
});

// Obtenez les jours uniques et filtrez pour exclure le jour actuel
const today = new Date().toDateString();
const filteredForecast = Object.values(uniqueDays).filter(
  (weather) => new Date(weather.dt * 1000).toDateString() !== today
).slice(0, 7); // Prenez les 7 jours suivants

// Ajoutez le jour actuel à la prévision si nécessaire
if (weather) {
  filteredForecast.unshift(weather); // Ajoutez la météo actuelle au début
}

  // Fonctions pour gérer l'ouverture/fermeture du menu mobile

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fonction pour fermer le menu après avoir sélectionné une ville
  const selectCity = (cityName) => {
    setCity(cityName);
    setMenuOpen(false);
  };

  return ( 
    <div className="container">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="city"
            placeholder="Rechercher une ville..."
            className="search-input"
          />
          <button className="search-button" type="submit">
            🔍
          </button>
        </form>
      </div>

      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul>
          <li><Link href="#" onClick={() => selectCity("Paris")}>Paris</Link></li>
          <li><Link href="#" onClick={() => selectCity("Lyon")}>Lyon</Link></li>
          <li><Link href="#" onClick={() => selectCity("Marseille")}>Marseille</Link></li>
          <li><Link href="#" onClick={() => selectCity("Toulouse")}>Toulouse</Link></li>
          <li><Link href="#" onClick={() => selectCity("Nice")}>Nice</Link></li>
          <li><Link href="#" onClick={() => selectCity("Bordeaux")}>Bordeaux</Link></li>
        </ul>
      </nav>

      {weather && (
        <div className="today-weather">
          <div className="today-info-container">
            <div className="day-item">
              <h1>Aujourd'hui à {weather.name}</h1>
              <div className="time">{new Date().toLocaleTimeString().substring(0, 5)}</div>
              <p className="temperature">{Math.round(weather.main.temp)}°C</p>
              <p className="weather">{weather.weather[0].description}</p>
              <div className="additional-info">
                <p className="wind-speed">💨 {weather.wind.speed}m/s</p>
                <p className="humidity">💧 {weather.main.humidity}%</p>
              </div>
              <div className="icon">
                <img src={getWeatherIcon(weather.weather[0].icon)} alt="Weather icon" width="40" height="40" />
              </div>
            </div>

            <div className="mini-map">
              <MiniMap city={city} />
            </div>
          </div>
        </div>
      )}

      {weeklyForecast && (
        <div className="weekly-weather">
          <div className="weekly-forecast">
            {filteredForecast.slice(0, 5).map((weather, index) => (
              <div key={index} className="day-item">
                <h3>{getDayOfWeek(new Date(weather.dt * 1000)).substring(0, 3)}</h3>
                <div className="icon2">
                  <img src={getWeatherIcon(weather.weather[0].icon)} alt="Weather icon" width="40" height="40" />
                </div>
                <p className="temperature2">{Math.round(weather.main.temp_min)}°/{Math.round(weather.main.temp_max)}°</p>
                <p className="humidite2">💧 {weather.main.humidity}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Fonction pour obtenir l'icône météo
function getWeatherIcon(icon) {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

// Fonction pour obtenir le jour de la semaine
function getDayOfWeek(date) {
  const days = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return days[date.getDay()];
}



