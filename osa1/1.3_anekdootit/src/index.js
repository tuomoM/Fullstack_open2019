import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';



const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [items, setItems] = useState([0,0,0,0,0])
    const selectRandom = () =>{
        setSelected(Math.floor(Math.random()*5))
    }
    const voteFor = ()=>{
       
        items[selected]+=1
        const newItems = items.map(x=>x)
       return setItems(newItems)
    }
    return (
      <div>
          <h2>Anecdote of the day</h2>
       <p>   
       <i>{anecdotes[selected]}</i>
       </p>
       <Statistic  items = {items} index = {selected}/>
       
       
        <Button text = ' vote anecdote' handleClick = {voteFor}/>
        <Button text =' next anecdote ' handleClick = {selectRandom}/>


        <h2>Anecdote with most votes</h2>
        <MostVoted items={items}/>

      </div>
    )
  }
const Statistic = ({items, index}) =>{
  
   return <p>has {items[index]} votes</p>
}

const MostVoted = ({items}) =>{
 let indeksi = 0
 let suurin = 0
 for(let i=0;i<5;i++){
   if(items[i]>suurin){
       suurin = items[i]
       indeksi = i
   }
 }
 if(suurin>0){
 return <p><i> {anecdotes[indeksi]}</i> <br></br> has {suurin} votes </p>
 }else{
     return <p></p>
 }
}
const Button = ({text , handleClick}) =>{
return <button onClick ={handleClick} >
    {text}
</button>

}


const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]




ReactDOM.render(<App />, document.getElementById('root'));


