import { useEffect, useState } from "react";
import ApiService from "../lib/services/ApiService";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Loading from "./Loading";
import PropTypes from "prop-types";

function CityList({ cityAndCountryCode, selectedCity, onSelect }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cities, setCities] = useState(undefined);
  const [error, setError] = useState([false, ""]);

  useEffect(() => {
    if (cityAndCountryCode) {
      setIsLoading(true);
      const [city, countryCode] = cityAndCountryCode;
      ApiService.searchCity(city, countryCode)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw res.json();
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
            if (withIds.length === 1) {
              onSelect(withIds[0]);
            }
          } else {
            setCities(undefined);
          }
          setError([false, ""]);
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
    }
  }, [cityAndCountryCode]);

  const handleChange = (event) => {
    const city = cities.find(city => city.id === event.target.value);
    onSelect(city);
  };
  const cityRow = (city) => {
    return (
      <ToggleButton key={city.id} value={city.id}>
        { city.name }{ city.state && `, ${city.state}` }, { city.country }
      </ToggleButton>
    );
  };
  const View = () => {
    if (error[0]) {
      return <div className="text-white bg-red-200 p-2 rounded text-center">{error}</div>;
    } else if (cities === undefined) {
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
      return <div>No cities were found</div>;
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