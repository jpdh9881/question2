import { useEffect, useState } from "react";
import ApiService from "../lib/services/ApiService";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Loading from "./Loading";
import PropTypes from "prop-types";

function CityList({ cityAndCountryCode, selectedCity, onSelect }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState(undefined);

  useEffect(() => {
    if (cityAndCountryCode) {
      setIsLoading(true);
      const [city, countryCode] = cityAndCountryCode;
      ApiService.searchCity(city, countryCode)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return [];
        })
        .then(cities => {
          if (cities) {
            const withIds = cities.map(city => {
              return {
                ...city,
                id: city.lat + "" + city.lon,
              };
            });
            setCities(withIds);
          } else {
            setCities(undefined);
          }
        })
        .catch(console.log)
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [cityAndCountryCode]);

  const handleChange = (event) => {
    const city = cities.find(city => city.id === event.target.value);
    onSelect(city);
  };
  const cityRow = (city) => {
    return (
      <ToggleButton key={city.id} value={city.id}>
        { city.name }, { city.state }, { city.country }
      </ToggleButton>
    );
  };
  const View = () => {
    if (cities === undefined) {
      return <div></div>;
    } else if (cities.length > 0) {
      return (
        <ToggleButtonGroup
        className="w-full"
          orientation="vertical"
          value={selectedCity?.id}
          exclusive
          onChange={handleChange}
        >
          { cities.map(city => cityRow(city)) }
        </ToggleButtonGroup>
      );
    } else {
      return <div>No cities!</div>;
    }
  }

  return (
    <div>
      { isLoading ? <Loading /> : View() }
    </div>
  );
}

CityList.propTypes = {
  cityAndCountryCode: PropTypes.array,
  selectedCity: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
};

export default CityList;