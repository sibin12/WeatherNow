import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Search from './components/Search'
import { Weather_Api_KEY, Weather_Api_URL } from './utils/api';
import Forecast from './components/Forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    try {
      const [lat, lon] = searchData.value.split(" ");

      // Fetch current weather and forecast data from the API
      const currentWeatherResponse = await fetch(`${Weather_Api_URL}/weather?lat=${lat}&lon=${lon}&appid=${Weather_Api_KEY}&units=metric`);
      const forecastResponse = await fetch(`${Weather_Api_URL}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_Api_KEY}`);

      // Parse and set current weather and forecast data in state
      const [currentWeatherData, forecastData] = await Promise.all([currentWeatherResponse.json(), forecastResponse.json()]);

      setCurrentWeather({ city: searchData.label, ...currentWeatherData });
      setForecast({ city: searchData.label, ...forecastData });
    } catch (error) {
      setError("An error occurred while fetching data. Please try again later.");
      console.error("Error fetching data:", error);
    }
  };


  return (
    <>
      <div className='container max-w-sm m-auto mt-10 '>
        <Search onSearchChange={handleOnSearchChange} />

        {error && (
          <div className="text-center bg-red-200 p-4 rounded-lg shadow-lg mt-5">
            <p className="text-lg text-red-700">{error}</p>
          </div>
        )}

        {(!currentWeather && !forecast) && (
          <div className="text-center bg-white p-6 rounded-lg shadow-lg mt-5">
            <div className="text-3xl font-bold mb-4">Get Weather</div>
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">Search for weather data</p>
          </div>
        )}

        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
      <div className=' mt-5 mx-10 '>
        {forecast && <Forecast data={forecast} />}
      </div>
    </>
  )
}

export default App
