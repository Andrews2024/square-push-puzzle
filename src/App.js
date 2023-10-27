import React from 'react';
import './App.css';
import Model from './Model.js';
import { config_5x5, config_4x4, config_6x6 } from "./PuzzleOptions";

export default function App() {
  let [model, setModel] = React.useState(new Model())

  let currentConfig = null;
  const canvasRef = React.useRef(null); // so we can access the Canvas elsewhere

  React.useEffect(() => {
    console.log(canvasRef.current);
  }, [canvasRef]);

  const handleConfig = (config) =>{
    model = new Model(config);
    currentConfig = config; // save current config for reset
  };

  const handleMoveCol = () => {};

  return (
    <main>
      <div className="button-group">
        <button className='config-button' onClick={() => handleConfig(config_4x4)}>4x4</button>
        <button className='config-button' onClick={() => handleConfig(config_5x5)}>5x5</button>
        <button className='config-button' onClick={() => handleConfig(config_6x6)}>6x6</button>
      </div>

      <canvas id='ctx' ref={canvasRef} width='300' height='300' />

      <div className='button-group'>
        <button className='game-button'>Reset Game</button>
        <button className='game-button'>Complete Game</button>
      </div>
      <div className="button-group">
        <button className='move-button'>Up</button>
        <button className='move-button'>Down</button>
        <button className='move-button'>Left</button>
        <button className='move-button'>Right</button>
      </div>
    </main>
  );
}
