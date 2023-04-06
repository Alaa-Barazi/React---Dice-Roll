import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dices from './Components/Dices/Dices'
import styled from 'styled-components';
import Scores from './Components/Scores/Scores'
function App() {
  const imgArr = ['/images/dice-1.png',
    '/images/dice-2.png',
    '/images/dice-3.png',
    '/images/dice-4.png',
    '/images/dice-5.png',
    '/images/dice-6.png'];
  var img1 = 0, img2 = 0, min = 1, max = 6,flag=0;
  function randNumbers() {
    img1 = Math.floor(Math.random() * (max - min + 1)) + min;
    img2 = Math.floor(Math.random() * (max - min + 1)) + min;
    {console.log("img1: "+img1+" img2:"+img2)}
  }
  
  

  const [count, setCount] = useState(0)
  const [dice, setDices] = useState(<Dices img1={imgArr[0]} img2={imgArr[1]}/>)
  const [points1, setPoints1] = useState(0)
  const [turns,setTurn] = useState(true)
  const [points2, setPoints2] = useState(0)
  const [global1,setGlobal1] = useState(0)
  const [global2,setGlobal2] = useState(0)
  const StyledButton = styled.button`
  display: inline-block;
  padding: 10px 18px;
  border-radius: 20px;
  background-color: lightgray;
  color:black;
  font-size: 16px;
  font-weight: bolder;
  text-decoration: none;
  text-align: center;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  opacity:60%;
  `;

  return (
    <div className="App">
      <div>


      </div>

      <div className="card">

        {dice}
        <br />
       {global1}  {global2}
       <br/>
        <Scores count={points1} />
        <StyledButton onClick={() => 
          { 
            if(turns){
            setPoints1((points1) => (points1 +img1+img2));
            
            }
            else{
              setPoints2((points2) => (points2 +img1+img2));
              
            }
             randNumbers();
             setDices(<Dices img1={imgArr[img1-1]} img2={imgArr[img2-1]}/>); 
           }}>
          ROLL DICE
        </StyledButton>
        <Scores count={points2} />
        <br/>   <br/>
        <button onClick={() =>{
          if(turns){
            setGlobal1(global1=>global1+points1);
            setPoints1(0);
          }
          else{
            setGlobal2(global2=>global2+points2);
            setPoints2(0);
          }
          setTurn(!turns)}}>
          
          Hold
        </button>
        
        <br /> <br />
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {points1}
        </button> */}
      </div>

    </div>
  )
}

export default App
