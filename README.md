# Weather React 🌦️

A clean, modern, and responsive weather forecast application built with React and Vite. It provides real-time weather data, hourly and daily forecasts, and dynamic backgrounds that change with the weather conditions.

**➡️ [Live Demo](https://weather-react-xi-five.vercel.app/ ) ⬅️** 
*(Replace with your actual Vercel URL)*

<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/1f759e39-8034-44d5-9030-81800e5403ff" />
*(This is an example URL. We will add a real screenshot in the next step)*

---

## ✨ Features

*   **Real-time Weather:** Get the current temperature, feels like, humidity, and wind speed.
*   **Dynamic UI:** 
    *   Background image changes based on the weather condition (clear, cloudy, rain, etc.) and time of day (day/night).
    *   Weather icons that accurately represent the forecast.
    *   Dark mode for comfortable viewing at night.
*   **Detailed Forecasts:**
    *   Hourly forecast for the next 24 hours.
    *   7-day forecast with max/min temperatures.
    *   Interactive charts for temperature and precipitation probability.
*   **Smart Search & Geolocation:**
    *   Search for any city worldwide.
    *   Automatically fetches weather for your current location on initial load.
*   **User-Friendly Experience:**
    *   Fully responsive design for mobile, tablet, and desktop.
    *   Loading and error states to provide clear feedback to the user.
    *   Dynamic page title and a custom favicon.

## 🛠️ Tech Stack

*   **Frontend:** [React](https://reactjs.org/ ), [Vite](https://vitejs.dev/ )
*   **Styling:** CSS Modules, Flexbox, Grid
*   **Data Fetching:** [Axios](https://axios-http.com/ )
*   **Charting:** [Recharts](https://recharts.org/ )
*   **Deployment:** [Vercel](https://vercel.com/ )

## 🚀 Running Locally

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yahyael995/weather-react.git
    cd weather-react
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env.local` file:**
    Create a file named `.env.local` in the root of the project and add your backend API URL:
    ```
    VITE_API_URL=http://localhost:3001
    ```
    *(Note: This assumes you are also running the [weather-backend](https://github.com/yahyael995/weather-backend ) project locally on port 3001).*

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---
