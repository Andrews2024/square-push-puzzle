import React from 'react';
import './App.css';
import Model from './Model.js';

import { config_5x5, config_4x4, config_6x6 } from "./PuzzleOptions";
import { redrawCanvas } from "./Canvas.js";

export default function App() {
  let [model, setModel] = React.useState(new Model())
  let [numMoves, setNumMoves] = React.useState(0);
  let [score, setScore] = React.useState(0);
  let [redraw, setRedraw] = React.useState(0); // for handling redraw of board
  let [currentConfig, setCurrentConfig] = React.useState(0); // store config for reset
  let [complete, setComplete] = React.useState(false);

  let scoreUpdate = 0;
  
  const canvasRef = React.useRef(null); // so we can access the Canvas elsewhere
  const appRef = React.useRef(null);

  React.useEffect (() => { redrawCanvas(model, canvasRef.current, appRef.current); }, [model, redraw]); // sets up refreshing of board
  React.useEffect(() => {}, [numMoves]); // sets up refreshing of move counter

  const handleConfig = (config) =>{
    setModel((prev) => new Model(config));
    setCurrentConfig((prev) => config); // save current config for reset
    setNumMoves((prev) => 0);
    setScore((prev) => 0);
  };

  const handleReset = () => {
    setModel((prev) => new Model(currentConfig));
    setNumMoves((prev) => 0);
    setScore((prev) => 0);
  };

  const handleMoveUp = () => {
    setNumMoves((prev) => prev + 1);
    scoreUpdate = model.puzzle.moveUp();
    setScore((prev) => prev + scoreUpdate);
    setRedraw((prev) => prev + 1); // redraw puzzle
  };

  const handleMoveDown = () => {
    setNumMoves((prev) => prev + 1);
    scoreUpdate = model.puzzle.moveDown();
    setScore((prev) => prev + scoreUpdate);
    setRedraw((prev) => prev + 1); // redraw puzzle
  };

  const handleMoveLeft = () => {
    setNumMoves((prev) => prev + 1);
    scoreUpdate = model.puzzle.moveLeft();
    setScore((prev) => prev + scoreUpdate);
    setRedraw((prev) => prev + 1); // redraw puzzle
  };

  const handleMoveRight = () => {
    setNumMoves((prev) => prev + 1);
    scoreUpdate = model.puzzle.moveRight();
    setScore((prev) => prev + scoreUpdate);
    setRedraw((prev) => prev + 1); // redraw puzzle
  };

  const handleRemove = () => {
    setNumMoves((prev) => prev + 1)
    setScore((prev) => prev + 4)
    model.puzzle.removeColor();
    setRedraw((prev) => prev + 1); // redraw puzzle
  };

  const handleComplete = () => {
    setComplete((prev) => true);
    setModel((prev) => new Model(null));
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
        <button className='game-button' onClick={() => handleReset()} disabled={currentConfig === 0}>Reset Game</button>
        <button className='game-button' onClick={() => handleComplete()} disabled={!model.puzzle.complete}>Complete Game</button>
      </div>

      <div className="button-group">
        <button className='move-button' onClick={() => handleMoveUp()} disabled={!model.puzzle.up}>Up</button>
        <button className='move-button' onClick={() => handleMoveDown()} disabled={!model.puzzle.down}>Down</button>
        <button className='move-button' onClick={() => handleMoveLeft()} disabled={!model.puzzle.left}>Left</button>
        <button className='move-button' onClick={() => handleMoveRight()} disabled={!model.puzzle.right}>Right</button>
        <button className='move-button' onClick={() => handleRemove()} disabled={!model.puzzle.removableColor}>Remove Color</button>
      </div>

      <div className="scoreboard">
        <p className="num-moves">Move Count: {numMoves}</p>
        <p className="score">Score: {score}</p>
      </div>
      <div className="complete" hidden={!complete}>
        <p>You completed the game! Select a configuration to continue.</p>
      </div>
    </main>
  );
}
