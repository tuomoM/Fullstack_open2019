
import './index.css';


import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) =>{
    return (
        <>
        <h1>{props.nimi}</h1>
        </>
    )
}
const Part = (props) =>{
    return(
        <>
        <p>{props.osa} {props.tehtavienLukumaara}</p>

        </>
    )
}
const Content = (props) =>{
    return(
        <>
        
        <Part osa={props.parts[0].name} tehtavienLukumaara={props.parts[0].exercises}/>
        <Part osa={props.parts[1].name} tehtavienLukumaara={props.parts[1].exercises}/>
        <Part osa={props.parts[2].name} tehtavienLukumaara={props.parts[2].exercises}/>
 
        </>
    )
}
const Total = (props) => {
    return (
        <p>yhteensä {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises} tehtavää


        </p>
    )
}
const App = () => {
    const Course = {
        name: 'Half Stack -sovelluskehitys',
    parts : [
     {
        name:'Reactin perusteet',
        exercises: 10
    },
    
    {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
    },
    
    {
        name: 'Komponenttien tila',
        exercises: 14
    }]}
   
  
    return (
      <div>
          <Header nimi = {Course.name}/>
          
          <Content parts = {Course.parts}/>
        <Total parts = {Course.parts}/>
      </div>
    )
  }
 



ReactDOM.render(<App />, document.getElementById('root'));


