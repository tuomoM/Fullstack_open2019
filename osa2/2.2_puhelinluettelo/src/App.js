import React, {useState, useEffect} from 'react';
import './App.css'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [filter, setFilter] = useState('')
  const [newTel, setTel] = useState('')
  useEffect(()=>{
    personService.getAll()
    .then(result=>{
      setPersons(result)
    })
  },[])
 const handleNewPerson = (event) =>{
   event.preventDefault()
   
   if(persons.find(p=>p.name===newName)===undefined){
   const newPerson = {
     //id : persons.length +1, //json file starts from 1, not 0
     name: newName,
     number: newTel
   }

   personService.create(newPerson).then(result=>{
     setPersons(persons.concat(result))
     setNewName('')
     setTel('')
   })
  
 
  }else{
    window.alert(`${newName} is already on the list`)

  }
 }
 const personsFiltered = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))


 const handleNameChange = (event)=>{
   setNewName(event.target.value)
 }
const handleTelChange = (event) =>{
  setTel(event.target.value)
}
const handleFilter = (event) =>{
  setFilter(event.target.value)
}
const handleRemove=(id)=>{
  console.log('id-remove',id)
  const person = persons.find(p=>p.id===id)
  if(window.confirm(`Delete ${person.name} ?`)){
  
    personService.remove(person.id)
  }
}

const rows = () =>{
  console.log('persons',personsFiltered)
 return personsFiltered.map(p=> <Person personName={p.name} 
  personTel={p.number} personId = {p.id}
  handleRemove = {handleRemove(p.id)}/>)

}
  return (
    <div>
      <h2><u>Phonebook</u></h2>
      <FilterForm filter ={filter} handleFilter ={handleFilter} text='Filter shown with'/>
      <h3>Add new</h3>
      <Addform name ={newName} handleName={handleNameChange} 
                    number = {newTel} handleN ={handleTelChange}
                    formHandler ={handleNewPerson}/>

      <h3>Numbers</h3>
      {rows()}
    </div>
  )

}

const Person = ({personId, personName,personTel,handleRemove}) =>{
return(
 
  <p id={personId}>{personName} {personTel} <button onClick={handleRemove}>Delete</button></p>
  
)

}
const FilterForm=({filter,handleFilter,text})=>{
  return(
    <form>
      {text} <input value={filter} onChange ={handleFilter}/>
    </form>
  )

}
const Addform = ({name,handleName,number,handleN,formHandler})=>{
return(
  <form  onSubmit={formHandler}>
  <div>
    name: <input value ={name} onChange ={handleName}/><br></br>
    number: <input value={number} onChange={handleN}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
  </form>
)
}

export default App;
