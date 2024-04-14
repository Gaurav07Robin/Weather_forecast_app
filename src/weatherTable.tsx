import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cloudyMoon from './icons/cloudy_moon.svg';
import cloudyDay1 from './static/cloudy-day-1.svg';
import cloudyDay2 from './static/cloudy-day-2.svg';
import day1 from './static/day.svg';
import night1 from './animated/night.svg';
import rainyDay1 from './animated/rainy-1.svg';
import rainyDay2 from './animated/rainy-2.svg';
import rainyDay3 from './animated/rainy-3.svg';
import snowyDay1 from './animated/snowy-1.svg';
import snowyDay2 from './animated/snowy-2.svg';
import thunder1 from './animated/thunder.svg';
import weather1 from './animated/weather_sagittarius.svg';


const WeatherTable = () => {
  const { cityName } = useParams();
  console.log("cityName", cityName);

  const [weatherData, setWeatherData] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [latitud, setLatitud] = useState<number | null>(null);
  const [longitud, setLongitud] = useState<number | null>(null);
  const [unit, setUnit] = useState<string>("metric");
  const [weatherCondition, setWeatherCondition] = useState<string>("Clouds");

  useEffect( () =>{
    const geocodeApi = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=f88331b9cf1b23ec60f1961c5327d50b`;
    console.log("geocodeApi : ", geocodeApi);
      fetch(geocodeApi)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0 && data[0].lat && data[0].lon) {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            setLatitud(latitude);
            setLongitud(longitude);
    
            
          } 
          
          else {
            console.error('Latitude and/or longitude not found in API response');
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error fetching geocode data:', error);
          setLoading(false);
        });
  },[latitud, longitud, unit]);


useEffect(() => {



    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitud}&lon=${longitud}&units=metric&exclude=hourly,daily&appid=f88331b9cf1b23ec60f1961c5327d50b`;
  
         // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=f88331b9cf1b23ec60f1961c5327d50b`;
          fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
              console.log("apiUrl: ", apiUrl);
              console.log("data", data);
              console.log("data weather condition: ", data.current.weather[0].main);
              setWeatherData(data.current);
              setWeatherCondition(data.weather)
              setLoading(false);
            })
            .catch(error => {
              console.error('Error fetching weather data:', error);
              setLoading(false);
            });



    
  },[latitud, longitud, unit]);

 
  const getWeatherIcon = (weatherCode: number) => {
    // Based on the weather code, return the corresponding SVG icon
    // You can find SVG icons for weather conditions online or create your own
    switch (weatherCode) {
      case 200: return "thunder1";
      case 201: return "thunder1";
      case 202: return "thunder1";
      case 210:return "thunder1";
      case 211:return "thunder1";
      case 212:return "thunder1";
      case 221:return "thunder1";
      case 230:return "thunder1";
      case 231:return "thunder1";
      case 232:return "thunder1";

      case 300: return "rainyDay3";
      case 301:return "rainyDay3";
      case 302:return "rainyDay3";
      case 310:return "rainyDay3";
      case 311:return "rainyDay3";
      case 312:return "rainyDay3";
      case 313:return "rainyDay3";
      case 314:return "rainyDay3";
      case 321:return "rainyDay3";
      

      case 500: return "rainyDay1";
      case 501:return "rainyDay1";
      case 502:return "rainyDay1";
      case 503:return "rainyDay1";
      case 504:return "rainyDay1";
      case 511:return "rainyDay2";
      case 520:return "rainyDay2";
      case 521:return "rainyDay2";
      case 522:return "rainyDay2";
      case 531:return "rainyDay2";
      

      case 600: return "snowyDay1";
      case 601:return "snowyDay1";
      case 602:return "snowyDay1";
      case 611:return "snowyDay1";
      case 612:return "snowyDay1";
      case 613:return "snowyDay2";
      case 615:return "snowyDay2";
      case 616:return "snowyDay2";
      case 620:return "snowyDay2";
      case 621:return "snowyDay2";
      case 622:return "snowyDay2";

      case 700: return "weather1";
      case 711:return "weather1";
      case 721:return "weather1";
      case 731:return "weather1";
      case 741:return "weather1";
      case 751:return "weather1";
      case 761:return "weather1";
      case 762:return "weather1";
      case 771:return "weather1";
      case 781:return "weather1";

      case 800: return "day1";

      case 801:return "day1";
      case 802:return "day1";
      case 803:return "day1";
      case 804:return "day1";

        // return 'cloudy_moon'; // Example icon for thunderstorm
      // Add more cases for different weather conditions
      default:
        return cloudyDay1; // Default icon
    }
  };
  

  if (loading) return <p>Loading...</p>;


  let weatherClass = '';
  if (weatherData) {
    const weatherConditionn = weatherData.weather.id; // Replace with actual weather condition property

    if(weatherConditionn < 300 && weatherConditionn >= 200 ){
      weatherClass = 'thunderstorm'
    }
    else if(weatherConditionn < 400 && weatherConditionn >= 300){
      weatherClass = 'drizzle'
    }
    else if(weatherConditionn < 500 && weatherConditionn >= 400){
      weatherClass = 'rain'
    }
    else if(weatherConditionn < 600 && weatherConditionn >= 500){
      weatherClass = 'snow'
    }
    else if(weatherConditionn < 700 && weatherConditionn >= 600){
      weatherClass = 'not-clear'
    }
    else if(weatherConditionn === 800){
      weatherClass = 'clear'
    }
    else {
      weatherClass = 'cloudy'
    }
    // switch (weatherConditionn) {
    //   case 'Clear':
    //     weatherClass = 'clear-sky';
    //     break;
    //   case 'Clouds':
    //     weatherClass = 'cloudy';           
    //     break;
    //   // Add more cases for other weather conditions
    //   default:
    //     weatherClass = '';
    //     break;
    // }
  }

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(event.target.value);
  };

  return (
    <div className={`weather-container ${weatherClass}`}>
      
      <h2>Weather for {cityName}</h2>

      <label htmlFor="unit">Select Unit:</label>
      <select id="unit" value={unit} onChange={handleUnitChange}>
        <option value="metric">Metric (Celsius, meter/sec)</option>
        <option value="imperial">Imperial (Fahrenheit, miles/hr)</option>
      </select>
      {weatherData && (
        <div className="weather-info">
          <img 
          src={getWeatherIcon(weatherData.weather.id)} 
          alt="Weather Icon"
           className="weather-icon fil0 fil1 fil2" 
        //    style={{ fill: '#C0CA33'  }}
           />
           {/* <p> {weatherData.temp && `${weatherData.temp}\u00B0${weatherData.units === 'metric' ? 'C' : 'F'}`} </p> */}
          
          <p style={{ fontFamily: 'serif', color: '#FFB600', fontSize: 20, fontWeight: 'bold'}}>Temperature: {weatherData.temp}°F</p>
          <p style={{ fontFamily: 'serif', color: '#FFB600', fontSize: 20, fontWeight: 'bold'}}>Humidity: {weatherData.humidity}%</p>
          <p style={{ fontFamily: 'serif', color: '#FFB600', fontSize: 20, fontWeight: 'bold'}}>Wind Speed: {weatherData.wind_speed} m/s</p>
          <p style={{ fontFamily: 'serif', color: '#FFB600', fontSize: 20, fontWeight: 'bold'}}>Pressure: {weatherData.pressure} </p>
          <p style={{ fontFamily: 'serif', color: '#FFB600', fontSize: 20, fontWeight: 'bold'}}>Sunrise :  {weatherData.sunrise} </p>
          <p style={{ fontFamily: 'serif', color: '#FFB600', fontSize: 20, fontWeight: 'bold'}}>Sunset : {weatherData.senset} </p>
          <p style={{ fontFamily: 'serif', color: '#FFB600', fontSize: 20, fontWeight: 'bold'}}>Clouds : {weatherData.clouds}</p>
          {/* Add more weather information here */}
        </div>
      )}
    </div>
  );
};

export default WeatherTable;