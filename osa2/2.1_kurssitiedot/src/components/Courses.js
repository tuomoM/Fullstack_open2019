
import React from 'react';



const Courses = ({courses})=>{ 
    const r = courses.map(a => Course(a) )
    return(r)
}  
const Course = (course) =>{
  return(
      <div key={course.id}>
      <h2 key={course.id} >{course.name}</h2>
         
             {course.parts.map(parts => <p key={parts.id}> {parts.name} {parts.exercises} </p>)}
             <p>yhteensä {course.parts.reduce((sum, {exercises})=> sum + exercises,0)} tehtävää</p>
      </div>


  )
}
export default Courses