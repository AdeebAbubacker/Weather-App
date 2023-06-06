import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faWater } from '@fortawesome/free-solid-svg-icons';

const Myhome = () => {
  const [data, setData] = useState({
    celsius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
  });

  const [name, setName] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const api =
      'https://api.openweathermap.org/data/2.5/weather?q=ALUVA&appid=035c9c114a7bc6d1698290fd89ce7a5b&&units=metric';
    fetch(api)
      .then((response) => response.json())
      .then((res) => {
        setData({
          ...data,
          celsius: res.main.temp,
          name: res.name,
          humidity: res.main.humidity,
          speed: res.wind.speed,
        });
      });
  }, []);

  const handleSearch = () => {
    if (name !== '') {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=035c9c114a7bc6d1698290fd89ce7a5b&&units=metric`;
      fetch(api)
        .then((response) => response.json())
        .then((res) => {
          setData({
            ...data,
            celsius: res.main.temp,
            name: res.name,
            humidity: res.main.humidity,
            speed: res.wind.speed,
          });
        });
    }
  };

  const handleInputChange = (event) => {
    const inputName = event.target.value;
    setName(inputName);
    setShowSuggestions(inputName.length > 0);

    // Fetch suggestions from the Google Places Autocomplete API
    const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY';
    const input = document.getElementById('city-input');
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' }, // Set the country if needed
      apiKey,
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.name) {
        setName(place.name);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    });
  };

  const handleSuggestionClick = (suggestion) => {
  setName(suggestion);
  setSuggestions([]);
  setShowSuggestions(false);
};


return (
  <body className="thisisbody">
    <div className="carddata">
      <br />

      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <input
                type="text"
                id="city-input"
                placeholder="Enter City Name"
                onChange={handleInputChange}
                value={name}
              />
              <label>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  bounce
                  size="2xl"
                  onClick={handleSearch}
                  className="searchicon"
                />
              </label>
            </div>
          </div>
          {showSuggestions && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <br />

      <div className="row">
        <div className="col-lg-12">
          <img src="weather.png" className="weatherimg" />
          <h2>
            <i>{data.celsius}</i>
          </h2>
          <h3>
            <i>{data.name}</i>
          </h3>
        </div>
      </div>
      <br />
      <br />

      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6">
                  <FontAwesomeIcon
                    icon={faWater}
                    fade
                    size="2xl"
                    className="humidicon"
                  />
                </div>
                <div
                  className="col-lg-6 text-left"
                  style={{ marginLeft: "-23px" }}
                >
                  <h5>
                    <i>Humidity</i>
                  </h5>
                  <h5 style={{ marginTop: "-10px" }}>
                    <i>{data.humidity}</i>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6">
                  <FontAwesomeIcon
                    icon={faWind}
                    fade
                    size="2xl"
                    className="windicon"
                  />
                </div>
                <div className="col-lg-6 text-left">
                  <h5 style={{ marginLeft: "-20px" }}>
                    <i>Wind</i>
                  </h5>
                  <h5 style={{ marginTop: "-10px", marginLeft: "-20px" }}>
                    <i>{data.speed}</i>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
);


};

export default Myhome;
