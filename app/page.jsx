"use client";

import "./page.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; 
import axios from "axios"; // Importer axios pour faire des requêtes HTTP
import MiniMap from "@/components/MiniMap";

export default function Home() {
  const [city, setCity] = useState("Paris"); // Ville par défaut
  const [weather, setWeather] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
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

  //loader
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 secondes de délai pour simuler le chargement
  }, []);

  if (loading) {
    return (
      <div className="loader">
        <img src="./image/F.png" alt="loader" />
      </div>
    );
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

  return ( 
    <div className="container">
      <div className="today-weather">
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

        <nav className="navbar scrollmenu">
          <ul>
            <li>
              <Link href="#" onClick={() => setCity("Paris")}>
                Paris
              </Link>
            </li>
            <li>
              <Link href="#" onClick={() => setCity("Lyon")}>
                Lyon
              </Link>
            </li>
            <li>
              <Link href="#" onClick={() => setCity("Marseille")}>
                Marseille
              </Link>
            </li>
            <li>
              <Link href="#" onClick={() => setCity("Toulouse")}>
                Toulouse
              </Link>
            </li>
            <li>
              <Link href="#" onClick={() => setCity("Nice")}>
                Nice
              </Link>
            </li>
            <li>
              <Link href="#" onClick={() => setCity("Bordeaux")}>
                Bordeaux
              </Link>
            </li>
          </ul>
        </nav>

        {weather && (
          <div className="today-info-container">
            <div className="day-item">
              <h1>Aujourd'hui</h1>
              <div className="city-time">
                <p className="city">{weather.name}</p>
                <p className="time">{new Date().toLocaleTimeString()}</p>
              </div>
              <div className="info">
                <p className="temperature">{weather.main.temp}°C</p>
                <p className="weather">{weather.weather[0].description}</p>{" "}
                {/* [0] ajouté pour corriger l'erreur */}
              </div>
              <div className="additional-info">
                <p className="wind-speed">💨 {weather.wind.speed} m/s</p>
                <p className="humidity">💧: {weather.main.humidity}%</p>
              </div>
              <div className="icon">
                <img src={getWeatherIcon(weather.weather[0].icon)} />
              </div>
            </div>

            {/* Ajouter la MiniMap ici */}
            <div className="mini-map">
              <MiniMap city={city} />
            </div>
          </div>
        )}

        {weeklyForecast && (
          <div className="weekly-weather">
            <div className="weekly-forecast">
              {filteredForecast.map((weather, index) => (
                <div key={index} className="day-item">
                  <h3>{getDayOfWeek(new Date(weather.dt * 1000))}</h3>

                  <div className="icon2">
                    <img src={getWeatherIcon(weather.weather[0].icon)} />
                  </div>
                  <div className="info2">
                    <p className="temperature2">
                      Min: {weather.main.temp_min}°C
                    </p>
                    <p className="temperature2">
                      Max: {weather.main.temp_max}°C
                    </p>
                    <p className="humidite2">💧: {weather.main.humidity}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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



