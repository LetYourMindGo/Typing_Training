import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './results.css'
import axios from 'axios';

const Results = ({wordCounter, setWordCounter, minutes, seconds, letterCounter, setLetterCounter, name, setHistory, history}) => {
  let finalTime, finalSpeed

  const navigate = useNavigate();

  const getFinalTime = () => {
    let min = minutes < 10 ? "0" + minutes : minutes;
    let sec = seconds < 10 ? "0" + seconds : seconds;
    finalTime = min + ":" + sec;
  };
  getFinalTime();

  const getFinalSpeed = () => {
    const toSeconds = minutes * 60;
    const time = toSeconds + seconds;
    const speedPerSec = letterCounter / time;
    finalSpeed = Math.round(speedPerSec * 60);
  };
  getFinalSpeed();

  const reset = e => {
    e.preventDefault();
    setHistory([...history, {
      name,
      speed: finalSpeed
    }])
    setWordCounter(wordCounter = 0)
    setLetterCounter(letterCounter = 0)
    navigate('/')
  }

  const uppdateLeaderboard = async () => {
    const result = {name, speed: finalSpeed}
    await axios.put('http://localhost:4040/leaderboard', result)
  }

  useEffect(() => {
    uppdateLeaderboard()
  }, [])  
  console.log('history:', history);
  return (
    <div className="results">
      <div className="results-container">
        <h1 className="results-container__title">Great job, {name}! Here are your result:</h1>
        <div className="results-container__results">
          <p className="results__amount">Amount of words: {wordCounter}</p>
          <p className="results__time">Time: {finalTime}</p>
          <p className="results__speed">Speed: {finalSpeed} letters/minute</p>
        </div>
      </div>
      <div className="results__button-container">
      <button className="results__button" type="submit" onClick={reset}>Restart</button>
      </div>
    </div>
  )
}

export default Results
