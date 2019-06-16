import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = () =>{
const [countries,setCountries] = useState([])
const [country,setCountry] = useState('')
const [weather, setWeather] = useState('')

const handleCountry =(event)=>{

  setCountry(event.target.value)

}
const handleButton=(event)=>{
 setCountry(event.target.getAttribute('data-arg1'))
}
useEffect(()=>{
  axios.get("https://restcountries.eu/rest/v2/all")
  .then(response=>{
    setCountries(response.data)   
  })
},[])
const countriesFiltered = countries.filter(maa=>maa.name.toLowerCase().includes(country.toLowerCase()))
  return(    
    <div>
      <form>
        find countries <input value={country} onChange={handleCountry}/>
      </form>
      <br></br>
      <DisplayCountry countriesF = {countriesFiltered}
       handleButton={()=>handleButton} weather= {weather}
       setWeather = {setWeather}/>  
      </div>
  )
}

const DisplayWeather =({capital,setWeather,weather})=>{
    useEffect(()=>{
      axios.get("http://api.apixu.com/v1/current.json?key=e685b44a980e41d387b205649190406&q="+capital)
      .then(response=>{
        setWeather(response.data)    
      })
    },[capital,setWeather])
    if(weather){
    return(
      <div>
      <h3>Wheather in {capital}</h3>
      <p>
      <b>Temperature:</b> {weather.current.temp_c} Celsius</p>
      <img src ={weather.current.condition.icon} height ="50" alt ="weather" />
      <p></p>
      <p><b>Wind: </b>{weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
      </div>)
    }else{
      return(<div></div>)
    }
}
const DisplayCountry=({countriesF,handleButton, weather,setWeather})=>{

if(countriesF.length===1){
  return(
    <div>
    <h1><b>{countriesF[0].name}</b></h1> 
    
    <p>Capital: {countriesF[0].capital}</p>
    <p>Population: {countriesF[0].population}</p>

    <h3>Languages</h3>
    {countriesF[0].languages.map(language=> 
    <p key={language.iso639_2}>{language.name}</p>)}
    <br></br>
    <img src ={countriesF[0].flag} height="150"style ={{border:'1px solid black'}} alt = "flag"/>
    <DisplayWeather capital = {countriesF[0].capital} setWeather = {setWeather} weather = {weather}/>
    </div>
  )
}else if(countriesF.length<11 && countriesF.length>0){
  return(
    <div>
    {countriesF.map(maa=> <p key = { maa.alpha2Code}>{maa.name}
    <button onClick ={handleButton()} data-arg1 ={maa.name} >show</button></p>)}
    </div>
  )
}
return(
  <div>Too many matches, specify another filter</div>
)}
export default App;