

# 🌤️ Application Météo

Cette application fournit des informations météorologiques en temps réel pour différentes localisations, en utilisant Next.js pour le développement front-end, l'API OpenWeather pour les données météorologiques et l'API Google Maps pour la visualisation des emplacements.

## 🚀 Fonctionnalités

- **Recherche de ville** : Permet aux utilisateurs de rechercher des informations météorologiques pour une ville spécifique.
- **Données météorologiques en temps réel** : Affiche la température actuelle, l'humidité, la vitesse du vent et d'autres informations pertinentes.
- **Carte interactive** : Affiche la localisation recherchée sur une carte Google Maps intégrée.

## 🛠️ Technologies utilisées

- **Framework** : [Next.js](https://nextjs.org/)
- **Langage** : JavaScript/TypeScript
- **Styles** : CSS/Tailwind CSS
- **APIs** :
  - [OpenWeather API](https://openweathermap.org/api) pour les données météorologiques.
  - [Google Maps API](https://developers.google.com/maps) pour l'affichage des cartes.

## 📦 Installation et configuration

### 1️⃣ Prérequis

- Node.js installé sur votre machine.
- Clé API pour OpenWeather. Obtenez-la en vous inscrivant sur [OpenWeather](https://openweathermap.org/appid).
- Clé API pour Google Maps. Obtenez-la en vous inscrivant sur [Google Cloud Platform](https://cloud.google.com/maps-platform/).

### 2️⃣ Cloner le projet

```bash
git clone https://github.com/Falilou2099/Projet-meteo.git
cd nom-du-repo
```

### 3️⃣ Installer les dépendances

```bash
npm install
```

### 4️⃣ Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet et ajoutez-y vos clés API :

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=VotreCléAPIOpenWeather
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=VotreCléAPIGoogleMaps
```

### 5️⃣ Lancer le serveur de développement

```bash
npm run dev
```

Accédez à l'application via `http://localhost:3000`.

## 📸 Aperçu
![Screenshot 2025-02-13 115522](https://github.com/user-attachments/assets/164eb6b2-50be-4155-b072-6bc4e0e5fc0c)
## 📜 Licence

Ce projet est open-source et peut être utilisé et modifié librement.

---
