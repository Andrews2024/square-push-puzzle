import './App.css';

function App() {
  return (
    <body>
      <div className="button-group">
        <button className="config-button">4x4</button>
        <button className='config-button'>5x5</button>
        <button classname='config-button'>6x6</button>
      </div>

      <div className='game-board'>
        <p>Game Board goes here</p>
      </div>

      <div className='button-group'>
        <button className='game-button'>Reset Game</button>
        <button className='game-button'>Complete Game</button>
      </div>
      <div className="button-group">
        <button className="move-button">Up</button>
        <button className='move-button'>Down</button>
        <button classname='move-button'>Left</button>
        <button classname='move-button'>Right</button>
      </div>
    </body>
  );
}

export default App;
