import "./index.css";
import UserInput from "./components/UserInput";
import CityList from "./components/CityList";
import { useState } from "react";
import DisplayWeatherData from "./components/DisplayWeatherData";

function App() {
  const [cityAndCountryCode, setCityAndCountryCode] = useState(undefined);
  const [selectedCity, setSelectedCity] = useState(undefined);

  const handleUserInput = (cityAndCountryCode) => {
    setCityAndCountryCode(cityAndCountryCode);
    setSelectedCity(undefined);
  };
  const handleNewCitySelection = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="max-w-sm flex flex-col justify-center items-start">
      <div className="w-full mb-4 flex">
        <div className="w-1/12 text-4xl mr-4">1</div>
        <div className="w-11/12 border-2 border-black flex-grow p-4">
          <UserInput onChange={handleUserInput} />
        </div>
      </div>
      <div className="w-full mb-4 flex">
        <div className="w-1/12 text-4xl mr-4">
          <span className={ cityAndCountryCode ? "text-black" : "text-stone-300" }>2</span>
        </div>
        <div className={ cityAndCountryCode ? "w-11/12 border-2 border-black p-4 flex-grow" : "" }>
          { cityAndCountryCode && <CityList onSelect={handleNewCitySelection} cityAndCountryCode={cityAndCountryCode} selectedCity={selectedCity} />}
        </div>
      </div>
      <div className="w-full mb-4 flex">
        <div className="w-1/12 text-4xl mr-4">
          <span className={ selectedCity ? "text-black" : "text-stone-300" }>3</span>
        </div>
        <div className={ selectedCity ? "w-11/12 border-2 border-black p-4 flex-grow" : "" }>
          { selectedCity && <DisplayWeatherData city={selectedCity} /> }
        </div>
      </div>
    </div>
  );
}

export default App;
