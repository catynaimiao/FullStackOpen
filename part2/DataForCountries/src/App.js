import { useState, useEffect } from "react";
import axios from "axios";
const apikey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const allCountries = response.data;
      setAllCountries(allCountries);
      setLoaded(true);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  let countries = [];
  if (allCountries.length > 0)
    countries = allCountries.filter((country) => {
      const common = country.name.common.toLowerCase();
      const target = filter.toLowerCase();
      return common.includes(target);
    });

  return (
    <div>
      <h1>All countries</h1>
      <div>
        find countries:{" "}
        <input
          type="text"
          disabled={!loaded}
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      {!loaded ? (
        <p>loading...</p>
      ) : (
        <Countries
          countries={countries}
          allCountries={allCountries}
          setCountries={setAllCountries}
        />
      )}
    </div>
  );
};

const CountryInfo = ({ country, show }) => {
  const { latlng } = country;
  const [weather, setWeather] = useState([]);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const uri = `https://api.openweathermap.org/data/3.0/onecall?lat=${latlng[0]}&lon=${latlng[1]}&exclude=current&appid=${apikey}`;

    axios.get(uri).then((response) => {
      const { current } = response.data;
      let icon = "";
      icon += current.weather[0].icon;
      setWeather(current);
      setIcon(`http://openweathermap.org/img/wn/${icon}@2x.png`);
    });
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>capital {[country.capital]}</p>
        <p>area {country.area}</p>
      </div>
      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img alt={country.name.common} src={country.flags.png} />
      <h2>Weather in {country.capital}</h2>
      <div>
        <p>temperature {Number(weather.temp - 273.15).toFixed(2)} Celcius</p>
        <img alt="weather" src={icon} />
        <p>wind {weather.wind_speed} m/s</p>
      </div>
    </div>
  );
};

const Countries = ({ countries, allCountries, setCountries }) => {
  const count = countries.length;

  const showCountryInfo = (name) => () => {
    const newCountires = allCountries.map((country) => {
      if (country.name.common === name) country.show = true;
      return country;
    });
    setCountries(newCountires);
  };

  const unshowCountryInfo = (name) => () => {
    const newCountires = allCountries.map((country) => {
      if (country.name.common === name) country.show = false;
      return country;
    });
    setCountries(newCountires);
  };

  if (count > 10) {
    return (
      <div>
        <p>Too many matches,specify another filter</p>
      </div>
    );
  } else if (count > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            <p>
              {country.name.common}{" "}
              {country.show ? (
                <button onClick={unshowCountryInfo(country.name.common)}>
                  unshow
                </button>
              ) : (
                <button onClick={showCountryInfo(country.name.common)}>
                  show
                </button>
              )}
            </p>
            {country.show ? <CountryInfo country={country} /> : ""}
          </div>
        ))}
      </div>
    );
  } else if (count === 1) {
    const country = countries[0];
    return <CountryInfo country={country} />;
  } else {
    return (
      <div>
        <p>No matching</p>
      </div>
    );
  }
};

export default App;
