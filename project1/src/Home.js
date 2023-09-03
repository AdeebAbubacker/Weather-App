import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faWater } from '@fortawesome/free-solid-svg-icons';

const Myhome = () => {
  
    const [data, setData] = useState({
      celcius: 10,
      name: 'London',
      humidity: 10,
      speed: 2
    });
  
    useEffect(() => {
      const api =
        'https://api.openweathermap.org/data/2.5/weather?q=ALUVA&appid=035c9c114a7bc6d1698290fd89ce7a5b&&units=metric';
      fetch(api)
        .then((response) => response.json())
        .then((res) => {
          setData({
            ...data,
            celcius: res.main.temp,
            name: res.name,
            humidity: res.main.humidity,
            speed: res.wind.speed
          });
        });
    }, []);
  
    const [name, setName] = useState('');
  
    const handlefun = () => {
      if (name !== '') {
        const api =
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=035c9c114a7bc6d1698290fd89ce7a5b&&units=metric`;
        fetch(api)
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
            setData({
              ...data,
              celcius: res.main.temp,
              name: res.name,
              humidity: res.main.humidity,
              speed: res.wind.speed
              
            });
          });
      }
    };

  return (
    <body className="thisisbody">
      <div className="carddata">
        <br />

        <div className="row">
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-12">
                <input type="text" placeholder="Enter City Name" onChange={(obj)=> setName(obj.target.value)}
                value={name}/>
                <label><FontAwesomeIcon icon={faMagnifyingGlass} bounce size="2xl" onClick={handlefun}
                className='searchicon'/></label>
              </div>
              </div>
          </div>
        </div><br/>

        <div className='row'>
            <div className='col-lg-12'>
                <img src="weather.png" className='weatherimg'/>
                <h2><i>{data.celcius} °C</i></h2>
                <h3><i>{data.name}</i></h3>
                              
            </div>
        </div><br/><br/>

        <div className='row'>

        <div className='col-lg-6'>
    <div className='row'>
        <div className='col-lg-12'>
            <div className='row'>
                <div className='col-lg-6'>
                <FontAwesomeIcon icon={faWater} fade size="2xl" className='humidicon'/>
                </div>
                <div className='col-lg-6 text-left' style={{marginLeft:"-23px"}}>
                    <h5><i>Humidity</i></h5>
                    <h5 style={{marginTop:"-10px"}}><i>{data.humidity}%</i></h5>
                </div>
            </div>
        </div>
    </div>
</div>

<div className='col-lg-6'>
    <div className='row'>
        <div className='col-lg-12'>
            <div className='row'>
                <div className='col-lg-6'>
                <FontAwesomeIcon icon={faWind} fade size="2xl" className='windicon' />
                </div>
                <div className='col-lg-6 text-left'>
                    <h5 style={{marginLeft:"-20px"}}><i>Wind</i></h5>
                   
                    <h5 style={{marginTop:"-10px",marginLeft:"-20px"}}><i>{data.speed}Km/hr</i>
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
