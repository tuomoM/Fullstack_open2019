
import React from 'react';



const Courses = ({courses})=>{ 
    
    return(
      <div>
        {courses.map(course=>(
          <Course key={course.id} course={course}/>
        ))}
      </div>
    )}  
const Course = ({course}) =>{

  return(
     <div>
      <h2>{course.name}</h2>
         
             {course.parts.map(parts => <p key={parts.id}> {parts.name} {parts.exercises} </p>)}
             <p>yhteensä {course.parts.reduce((sum, {exercises})=> sum + exercises,0)} tehtävää</p>
      </div>


  )
}
export default Courses