import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import UtilityService from "../lib/services/Utility";
import { PropTypes } from "prop-types";

function UserInput({ onChange }) {
  const cityInputRef = useRef(null);
  const countryCodeInputRef = useRef(null);
  const [error, setError] = useState(false);

  // handlers
  const handleInputCity = (event) => {
    if (event.target.value === "") {
      onChange(undefined);
    } else {
      onChange([event.target.value, countryCodeInputRef.current.value]);
    }
  };
  const handleInputCountryCode = (event) => {
    if (cityInputRef.current.value !== "") {
      onChange([cityInputRef.current.value, event.target.value]);
    }
  }
  const handleBlur = () => {
    if (cityInputRef.current.value === "" && countryCodeInputRef.current.value !== "") {
      setError(true);
    } else {
      setError(false);
    }
  }

  return (
    <div className="">
      <h2 className="mb-4">Enter City / Country Code (optional)</h2>
      <div className="flex">
        <div className="mr-4">
          <TextField
            inputRef={cityInputRef}
            id="city" type="text" label="City"
            error={error}
            helperText={error ? "City is required" : ""}
            onBlur={handleBlur}
            onInput={UtilityService.debounce(handleInputCity)} />
        </div>
        <div>
          <TextField
            inputRef={countryCodeInputRef}
            id="countryCode" type="text" label="Country" inputProps={{maxLength: 2, size: 5}}
            onBlur={handleBlur}
            onInput={UtilityService.debounce(handleInputCountryCode)} />
        </div>
      </div>
    </div>
  );
}

UserInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default UserInput;