import ApiService from "../lib/services/ApiService";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Loading from "./Loading";
// icons
import ThermostatIcon from '@mui/icons-material/Thermostat';
import WaterIcon from '@mui/icons-material/Water';
import AirIcon from '@mui/icons-material/Air';

function DisplayWeatherData({ city }) {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState(undefined);
  const [error, setError] = useState([false, ""]);

  useEffect(() => {
    if (city) {
      setIsLoading(true);
      ApiService.fetchCurrentWeatherData(city.lat, city.lon)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw res.json();
          })
          .then(data => {
            setWeather(data);
          })
          .catch(error => {
            if (error) {
              setError([true, error.message]);
            } else {
              setError([true, "Unknown error occurred."]);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
    } else {
      setWeather(undefined);
    }
  }, [city]);

  const cell = (label, icon, data) => {
    return (
      <div className="flex items-center mb-2">
        <div className="mr-2">{ icon } </div>
        <div className="flex flex-col">
          <div>{ data }</div>
          <div className="text-xs text-stone-300">{ label }</div>
        </div>
      </div>
    );
  };
  const View = () => {
    if (error[0]) {
      return <div className="text-white bg-red-200 p-2 rounded text-center">{error}</div>;
    } else {
      return (
        <div>
          <h3 className="text-center text-3xl">{ city.name + ", " + weather?.sys?.country }</h3>
          <h4 className="mb-4 text-center text-lg text-stone-400">Station: { weather?.name }</h4>
          <div className="w-full grid grid-cols-2">
            { cell("°C temp", <ThermostatIcon fontSize="large" />, weather?.main.temp) }
            { cell("°C feels like", <ThermostatIcon fontSize="large" />, weather?.main.feels_like) }
            { cell("% humidity", <WaterIcon fontSize="large" />, weather?.main.humidity) }
            { cell("m/s wind", <AirIcon fontSize="large" />, weather?.wind.speed) }
            <div className="col-span-2 mt-2 pt-2 border-t-2 border-stone-200">
              <h4 className="text-center">Weather Reports</h4>
              {
                weather?.weather.map(report => {
                  return (<div className="bg-stone-50 p-2 mb-2 text-sm" key={report.description}>- { report.description }</div>);
                })
              }
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      { isLoading ? <Loading /> : View() }
    </div>
  );
}

DisplayWeatherData.propTypes = {
  city: PropTypes.object,
};

export default DisplayWeatherData;