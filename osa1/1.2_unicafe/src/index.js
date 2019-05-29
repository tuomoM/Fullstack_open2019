import React,{useState} from 'react';
import ReactDOM from 'react-dom';
//import './index.css';

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const annaHyvaa = ()=>{
        return setGood(good +1)
    }
    const annaNeutraalia = ()=>{
        return setNeutral(neutral+1)
    }
    const annaPahaa = ()=>{
        return setBad(bad+1)
    }
    return (
      <div>
        <h2>Anna palautetta</h2>
        
        <Button text = {'hyvä'} handleClick ={annaHyvaa} />
        <Button text = {'neuraali'} handleClick ={annaNeutraalia} />
        <Button text = {'huono'} handleClick ={annaPahaa} />
       
        <h2>Statistiikka</h2>
        <Statistiikka good={good} bad = {bad} neutral = {neutral} />
        

      </div>
    )
  }
  const Statistiikka=({good,neutral,bad}) =>{

    
      
          if(good===0&&neutral===0&&good===0){
            return (
                <div>
                    <p>Ei yhtään palautetta</p>
                </div>
            )
          }else{
              return(

                
                     <table>
                         <tbody>
                         <tr>
                            <td>hyvä</td>
                             <td>{good}</td>
                         </tr>
                         <tr>
                             <td>neutraali</td>
                             <td>{neutral}</td>
                         </tr>
                         <tr>
                             <td>huono</td>
                             <td>{bad}</td>
                         </tr>
                         <tr>
                             <td>yhteensä</td>
                             <td>{bad+good+neutral}</td>
                         </tr>
                         <tr>
                             <td>keskiarvo</td>
                             <td>{(-bad+good)/(bad+good+neutral)}</td>
                         </tr>
                         <tr>
                             <td>positiivisia</td>
                             <td>{Math.round((100*good/(good+bad+neutral)))}%</td>
                         </tr>
                         </tbody>
                     </table>

              )   
          }

  }
 
  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>)



ReactDOM.render(<App />, document.getElementById('root'));


