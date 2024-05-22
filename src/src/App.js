import {  useState } from "react";
import './App.css';                                                              
import searchs from "./asset/search.png";
import cloudIcons from "./asset/cloud.png";
import drizzzleIcons from "./asset/drizzle.png";
import humidity from "./asset/humidity.png";
import snowIcons from "./asset/snow.png";
import rainIcons from "./asset/rain.png";
import weatherIcon from "./asset/weather-icon.png";
import wind from "./asset/wind.png";
import mistIcons from "./asset/mist.png";
import thunderIcons from "./asset/thunder.png";
// import snowrainIcons from "./asset/snowrain.png";
import PropType from "prop-types";


const WeatherDetails =({Icons,Temp,City,Country,Lat,Log,Humidity,Wind})=>{
  return(
    <>
    <div className="image">
      <img src ={Icons} alt="not found"/>
    </div>
    <div className="temp">{Temp}°c</div>
    <div className="location">{City}</div>
    <div className="country">{Country}</div>
    <div className="cord">
      <div>
        <span className="lat">latitude</span>
        <span>{Lat}</span>
      </div>
      <div>
        <span className="log">longitude</span>
        <span>{Log}</span>
      </div>
    </div>
     <div className="data-container">
        <div className="element">
          <img className="humidity-icon" src={humidity} alt="not found"/>
          <div className="humidity-per">{Humidity}%</div>
          <div className="humidity-txt">Humidity</div>
        </div>

        <div className="element">
          <img className="humidity-icon" src={wind} alt="not found"/>
          <div className="humidity-per">{Wind}km/hr</div>
          <div className="humidity-txt">Windspeed</div>
        </div>
     </div>
    </>
  )
};

WeatherDetails.propType ={
  Icons:PropType.string.isRequired,
  Temp:PropType.number.isRequired,
  City:PropType.string.isRequired,
  Country:PropType.string.isRequired,
  Humidity:PropType.number.isRequired,
  Lat:PropType.number.isRequired,
  Log:PropType.number.isRequired,
  Wind:PropType.number.isRequired,
}


function App() {

  let api_key = "d54cb77ac3f70b30306fc4386cb7615b"
   
  const [text,setText] = useState("City");
  const [icons,setIcons]= useState (weatherIcon );
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("city");
  const [country,setCountry]=useState("country");
  const [lat,setLat]=useState("0");
  const [log,setLog]=useState("0");
  const [humidity,setHumidity]=useState("0");
  const [wind,setWind]=useState("0");
  const [error,setError]=useState();

  const [cityNotfound,setCityNotfound] = useState(false);
  const [loading,setLoading] = useState(false);
  


const weatherIcons={
    "01d":weatherIcon,
    "01n":weatherIcon,
    "02d":cloudIcons,
    "02n":cloudIcons,
    "03d":drizzzleIcons,
    "03n":drizzzleIcons,
    "04d":drizzzleIcons,
    "04n":drizzzleIcons,
    "09d":rainIcons,
    "09n":rainIcons,
    "10d":rainIcons,
    "10n":rainIcons,
    "13d":snowIcons,
    "13n":snowIcons,
    "50d":mistIcons,
    "50n":mistIcons,
    "11d":thunderIcons,
    "11n":thunderIcons,
};





  const search=async()=>{

    setLoading(true);
   

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    // https://api.openweathermap.org/data/2.5/weather?q=erode&appid=d54cb77ac3f70b30306fc4386cb7615b&units=Metric
     
    try{
     let res= await fetch(url);
     let data =await res.json();
    //  console.log(data);
    if(data.cod === "404"){
      console.error ("city not found");
      setCityNotfound(true);
      setLoading(false);
      return;
    }
    
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLog(data.coord.lon);

    const weatherIconCode=data.weather[0].icon;
    setIcons(weatherIcons[weatherIconCode] || weatherIcon);
    setCityNotfound(false); 

    }catch (error){
      console.error("an error occurred",error.messaoge);
      setError("an error occur while fetching data");
    }finally{
      setLoading(false);
    }
 };


const handleCity =(e)=>{
  setText(e.target.value);
};

const handelKeyDown = (e)=>{
  if (e.key === "Enter"){
    search();
  }
};

//  useEffect(function(){
//    search();
//  })


  return (
    <>
    <div className="container">
          <div className="input-container">
            <input type="text" className="cityinput" placeholder="search city" onChange={handleCity}  onKeyDown={handelKeyDown}/>
            <div className="search-icon" onClick={()=>search()}><img className="searchicon"src={ searchs} alt="img not"/></div>

          </div>

          {loading && <div className="loading-message">loading...</div>}
          {error && <div className="error-message">{error}</div>}
          {cityNotfound && <div className="citynotfound">city not found</div>}



          {!loading && !cityNotfound && <WeatherDetails Icons={icons} Temp={temp} City={city} Country={country} Lat={lat} Log={log} 
          Humidity={humidity} Wind={wind}/>}

         

    </div>
    </>
  );
};

export default App;
