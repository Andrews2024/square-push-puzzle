import React from 'react';
import './App.css';
import Model from './Model.js';

import { config_5x5, config_4x4, config_6x6 } from "./PuzzleOptions";
import { redrawCanvas } from "./Canvas.js";

export default function App() {
  let [model, setModel] = React.useState(new Model())
  let [numMoves, setNumMoves] = React.useState(0);
  let [redraw, setRedraw] = React.useState(0); // for handling redraw of board

  let currentConfig = null;
  
  const canvasRef = React.useRef(null); // so we can access the Canvas elsewhere
  const appRef = React.useRef(null);

  React.useEffect (() => { redrawCanvas(model, canvasRef.current, appRef.current); }, [model, redraw]); // sets up refreshing of board
  React.useEffect(() => {}, [numMoves]); // sets up refreshing of move counter

  const handleConfig = (config) =>{
    setModel((prev) => new Model(config));
    currentConfig = config; // save current config for reset
    setNumMoves((prev) => 0);
    setRedraw(redraw++); // redraw puzzle
  };

  const handleReset = () => {
    setModel((prev) => new Model(currentConfig));
    setNumMoves((prev) => 0);
    setRedraw(redraw++); // redraw puzzle
  };

  const handleMoveUp = () => {
    setNumMoves((prev) => prev + 1);
  };

  const handleMoveDown = () => {
    setNumMoves((prev) => prev + 1);
  };

  const handleMoveLeft = () => {
    setNumMoves((prev) => prev + 1);
  };

  const handleMoveRight = () => {
    setNumMoves((prev) => prev + 1);
  };

  return (
    <main className="App" ref={appRef}>
      <div className="button-group">
        <button className='config-button' onClick={() => handleConfig(config_4x4)}>4x4</button>
        <button className='config-button' onClick={() => handleConfig(config_5x5)}>5x5</button>
        <button className='config-button' onClick={() => handleConfig(config_6x6)}>6x6</button>
      </div>

      <canvas id='ctx' ref={canvasRef} width={300} height={300} />

      <div className='button-group'>
        <button className='game-button' onClick={() => handleReset()}>Reset Game</button>
        <button className='game-button'>Complete Game</button>
      </div>

      <div className="button-group">
        <button className='move-button' onClick={() => handleMoveUp()}>Up</button>
        <button className='move-button' onClick={() => handleMoveDown()}>Down</button>
        <button className='move-button' onClick={() => handleMoveLeft()}>Left</button>
        <button className='move-button' onClick={() => handleMoveRight()}>Right</button>
      </div>

      <div className="scoreboard">
        <p className="num-moves">Move Count: {numMoves}</p>
        <p className="score">Score: {}</p>
      </div>
    </main>
  );
}
