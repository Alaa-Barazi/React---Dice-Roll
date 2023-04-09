# React Dice Roll

This project is a simple React app for rolling two dice and keeping track of the scores for two players. The application has been improved with the following changes:

## Changes and Additions

1. **Refactored components**: The `Dices` and `Scores` components have been refactored for better readability and reusability.
2. **Improved UI**: The User Interface has been improved with the addition of new buttons and the use of `styled-components`.
3. **Added functionality**: Implemented the "Hold" button, allowing players to switch turns and accumulate points.
4. **LocalStorage integration**: The app now utilizes the browser's `localStorage` to store and retrieve scores and game data, allowing for better persistence of game state between sessions.


## Screenshots

![Updated UI](/screenshot/Ruels.png)
![Updated UI](/screenshot/scores.png)


The screenshot above shows the app during gameplay, demonstrating the dice roll and score tracking features.
![Updated UI](/screenshot/playing.png)
## Code Changes

Here are some code snippets showing the changes and additions made to the project:
## LocalStorage Integration

```jsx
// Storing scores in localStorage
localStorage.setItem('player1Score', global1);
localStorage.setItem('player2Score', global2);

// Retrieving scores from localStorage
const storedPlayer1Score = localStorage.getItem('player1Score') || 0;
const storedPlayer2Score = localStorage.getItem('player2Score') || 0;
```
### Dices Component

```jsx
import styled from 'styled-components';

export default function Dices({img1,img2}) {
    const StyledImg=styled.img`
    border: 3px groove lightgray;
    padding: 10px;
    box-shadow: 3px gray;
    width:70px;
    height:70px;`;

    return (
        <>
        <StyledImg src={img1} ></StyledImg>
        <br/> <br/>
        <StyledImg src={img2} ></StyledImg>
        </>
    )
}
```
## Scores Component
```jsx
import './style.css';

export default function Scores({count}) {
    return(
        <>
        <button className="rounded-button">Current <br/>{count}</button>
        </>
    )
}
```
## App Component with added functionality
```jsx 
// ...
const [global1,setGlobal1] = useState(0);
const [global2,setGlobal2] = useState(0);

// ...
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
// ...
```
## Conclusion
The updated React Dice Roll app now provides an improved user experience with a refined user interface and additional functionality, making it more enjoyable for players to use.
