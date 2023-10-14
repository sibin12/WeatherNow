import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Search from './components/Search'
import { Weather_Api_KEY, Weather_Api_URL } from './utils/api';
import Forecast from './components/Forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${Weather_Api_URL}/weather?lat=${lat}&lon=${lon}&appid=${Weather_Api_KEY}&units=metric`)
    const forecastFetch = fetch(`${Weather_Api_URL}/forecast?lat=${lat}&lon=${lon}&appid=${Weather_Api_KEY}`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (res) => {
        const weatherResponse = await res[0].json();
        const forecastRespone = await res[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastRespone })
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className='container max-w-sm m-auto mt-10 '>
        <Search onSearchChange={handleOnSearchChange} />

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
