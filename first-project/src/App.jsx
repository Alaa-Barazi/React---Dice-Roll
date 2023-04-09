import { useState, useEffect } from "react";
import "./App.css";
import Dices from "./Components/Dices/Dices";
import styled from "styled-components";
import Scores from "./Components/Scores/Scores";

const imgArr = [
  "/images/dice-1.png",
  "/images/dice-2.png",
  "/images/dice-3.png",
  "/images/dice-4.png",
  "/images/dice-5.png",
  "/images/dice-6.png",
];

function App() {
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);
  const [unluckyMessage, setUnluckyMessage] = useState("");
  const [dice, setDices] = useState(<Dices img1={imgArr[0]} img2={imgArr[1]} />);
  const [points1, setPoints1] = useState(0);
  const [points2, setPoints2] = useState(0);
  const [global1, setGlobal1] = useState(0);
  const [global2, setGlobal2] = useState(0);
  const [turns, setTurn] = useState(true);
  const [predefinedScore, setPredefinedScore] = useState(100);
  const [winner, setWinner] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);

  var img1 = 0,
    img2 = 0,
    min = 1,
    max = 6;
    function readWinCount() {
      const rawData = fs.readFileSync("winCount.json");
      const winCount = JSON.parse(rawData);
      return winCount;
    }
    function saveWinCount(player1Wins, player2Wins) {
      localStorage.setItem("player1Wins", player1Wins);
      localStorage.setItem("player2Wins", player2Wins);
    } 
        
  function randNumbers() {
    img1 = Math.floor(Math.random() * (max - min + 1)) + min;
    img2 = Math.floor(Math.random() * (max - min + 1)) + min;
    console.group("img1: " + img1 + " img2:" + img2);
    return { img1, img2 };
  }

  function startGame() {
    setShowRules(false);
    setShowScorePopup(true);
  }

  function handleScorePopupClose() {
    setShowScorePopup(false);
    setGameStarted(true);
  }

  function hold() {
    if (turns) {
      if (points1 + global1 > predefinedScore) {
        setWinner("Draw");
      } else if (points1 + global1 === predefinedScore) {
        setWinner("Player 1");
      } else {
        setGlobal1((global1) => global1 + points1);
      }
      setPoints1(0);
    } else {
      if (points2 + global2 > predefinedScore) {
        setWinner("Draw");
      } else if (points2 + global2 === predefinedScore) {
        setWinner("Player 2");
      } else {
        setGlobal2((global2) => global2 + points2);
      }
      setPoints2(0);
    }
    setTurn(!turns);
  }
  function newGame() {
    if (winner === "Player 1") {
      setPlayer1Wins((prevWins) => prevWins + 1);
      saveWinCount(player1Wins + 1, player2Wins);
    } else if (winner === "Player 2") {
      setPlayer2Wins((prevWins) => prevWins + 1);
      saveWinCount(player1Wins, player2Wins + 1);
    }
    setPoints1(0);
    setPoints2(0);
    setGlobal1(0);
    setGlobal2(0);
    setTurn(true);
    setWinner("");
  }

  function handlePredefinedScoreChange(e) {
    setPredefinedScore(e.target.value);
  }
  useEffect(() => {
    const storedPlayer1Wins = localStorage.getItem("player1Wins");
    const storedPlayer2Wins = localStorage.getItem("player2Wins");

    if (storedPlayer1Wins) {
      setPlayer1Wins(parseInt(storedPlayer1Wins));
    }

    if (storedPlayer2Wins) {
      setPlayer2Wins(parseInt(storedPlayer2Wins));
    }
  }, []);
  

  const StyledButton = styled.button`
  display: inline-block;
  padding: 10px 18px;
  border-radius: 20px;
  background-color: lightgray;
  color: black;
  font-size: 16px;
  font-weight: bolder;
  text-decoration: none;
  text-align: center;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  opacity: 60%;
`;

const RulesButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const RulesContainer = styled.div`
  display: ${showRules ? "block" : "none"};
`;

const ActivePlayerName = styled.span`
  color: ${turns ? "blue" : "red"};
`;

const Container = styled.div`
  background-color: pink;
  padding: 20px;
  border-radius: 10px;
`;

useEffect(() => {
  const storedPlayer1Wins = localStorage.getItem("player1Wins");
  const storedPlayer2Wins = localStorage.getItem("player2Wins");

  if (storedPlayer1Wins) {
    setPlayer1Wins(parseInt(storedPlayer1Wins));
  }

  if (storedPlayer2Wins) {
    setPlayer2Wins(parseInt(storedPlayer2Wins));
  }
}, []);

function handleScorePopupClose() {
  setShowScorePopup(false);
  setGameStarted(true);
}

return (
  <div className="App">
    {!gameStarted && (
      <Container>
        <h2>Rules</h2>
        <ul>
          <li>The game has 2 players, playing in rounds.</li>
          <li>In each turn, a player rolls 2 dice as many times as he wishes.</li>
          <li>Each result will get added to his round’s score.</li>
          <li>But if the player rolls a double six, all his round’s score gets lost.</li>
          <li>After that, it's the next player’s turn.</li>
          <li>A player can choose to ‘Hold’, which means that his round’s score gets added to his global score.</li>
          <li>After that, it's the next player's turn.</li>
          <li>
            The first player to pass predefined score points loose. The first
            player to reach predefined score exactly wins.
          </li>
        </ul>
        <button onClick={startGame}>Start</button>
      </Container>
    )}

    {showScorePopup && (
      <Container>
        <h2>Choose Score to Win and Player Names</h2>
        <label>
          Winning Score:{" "}
          <input
            type="number"
            value={predefinedScore}
            onChange={handlePredefinedScoreChange}
            max={100}
          />
        </label>
        <br />
        <label>
          Player 1 Name:{" "}
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
        </label>
        <br />
        <label>
          Player 2 Name:{" "}
          <input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleScorePopupClose}>Start Game</button>
      </Container>
    )}

    {gameStarted && (
      <Container>
        <h3>
          <ActivePlayerName>{turns ? player1Name : player2Name}</ActivePlayerName> is playing
        </h3>
        <div>
          {player1Name}: {global1} | {player1Wins} wins
        </div>
        <div>
          {player2Name}: {global2} | {player2Wins} wins
        </div>
        <hr />
        {dice}
        <br />
        {unluckyMessage && <p>{unluckyMessage}</p>}
        <br />
        <Scores count={points1} />
        <StyledButton
          onClick={() => {
            const { img1, img2 } = randNumbers();
            setDices(<Dices img1={imgArr[img1 - 1]} img2={imgArr[img2 - 1]} />);

            if (img1 === 6 && img2 === 6) {
              setUnluckyMessage("Unlucky! You rolled double sixes, you lose your turn and points for this round.");
              if (turns) {
                setPoints1(0);
              } else {
                setPoints2(0);
              }
              setTurn(!turns);
            } else {
              setUnluckyMessage("");
              if (turns) {
                setPoints1((points1) => points1 + img1 + img2);
              } else {
                setPoints2((points2) => points2 + img1 + img2);
              }
            }}
          }
          >
            ROLL DICE
          </StyledButton>
  
          <Scores count={points2} />
          <br /> <br />
          <button onClick={hold}>Hold</button>
          <br /> <br />
          {winner && (
            <p>
              Congratulations, {winner === "Player 1" ? player1Name : player2Name} wins the game!
            </p>
          )}
          <button onClick={newGame}>New Game</button>
        </Container>
      )}
    </div>
  );
  

  }
  
  export default App;
  
