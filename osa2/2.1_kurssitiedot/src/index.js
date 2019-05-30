import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App  = () => {
    const courses =[ {
        name: 'Half Stack -sovelluskehitys',
        id: 1,
        parts : [
        {
        name:'Reactin perusteet',
        exercises: 10,
        id: 1
    },
    {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
    },
    {
        name: 'Komponenttien tila',
        exercises: 14,
        id: 3
    },
    {
        name: 'Redux',
        exercises: 7,
        id: 4
    }
]},{
    name:'Node.js',
    id: 2,
    parts: [
        {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewaret',
            exercises: 7,
            id: 2
          }
    ]
    
}]

  return(
    <div>
          <Courses courses = {courses}/>
    </div>

  )
}
const Courses = ({courses})=>{
    
    const r = courses.map(a => Course(a) )
    
console.log('Return',r)
return(r)}  
const Course = (course) =>{
  console.log(course,course.name)
  return(
      <>
      <h2 key={course.id} >{course.name}</h2>
         
             {course.parts.map(parts => <p key={parts.id}> {parts.name} {parts.exercises} </p>)}
             <p>yhteensä {course.parts.reduce((sum, {exercises})=> sum + exercises,0)} tehtävää</p>
      </>


  )
}
ReactDOM.render(<App />, document.getElementById('root'));


