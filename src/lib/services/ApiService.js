const APP_ID = "appid=" + process.env.REACT_APP_API_KEY;

const searchCity = (city, country) => {
  const base = "https://api.openweathermap.org/geo/1.0/direct?";
  const country_ = country? "," + country : "";
  const city_ = "q=" + city + country_;
  const url = `${base}${city_}&limit=5&${APP_ID}`;
  return fetch(url);
};
const fetchCurrentWeatherData = (lat, lon) => {
  const lat_ = "lat=" + lat;
  const lon_ = "lon=" + lon;
  const units = "units=metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?${lat_}&${lon_}&${units}&${APP_ID}`;
  return fetch(url);
}

const service = {
  searchCity,
  fetchCurrentWeatherData,
};
export default service;