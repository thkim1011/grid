import React, {useState} from 'react';
import './App.css';

function App() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  const [grid, setGrid] = useState(null);

  const handleSubmit = () => {
    const arr = []
    arr.length = rows * cols;
    arr.fill(0);
    setGrid(arr);
    console.log(arr);
  };
  
  const whiteBoxStyle = {
    backgroundColor: 'white', 
    border: '2px solid black',
    width: '50px',
    height: '50px',
    display: 'inline-block',
    margin: '10px'
  };

  const blackBoxStyle = {
    backgroundColor: 'black', 
    border: '2px solid black',
    width: '50px',
    height: '50px',
    display: 'inline-block',
    margin: '10px'
  };

  const makeHandleBoxClick = (i, j) => {
    return () => {
      setGrid(grid => {
        const new_grid = [...grid];
        new_grid[cols * i + j] = 1 - new_grid[cols * i + j];
        return new_grid;
      });
    }
  }

  const handleRandomize = () => {
    setGrid(grid => grid.map(() => Math.floor(Math.random() * 2)));
  }

  const gridRender = !grid ? null : []
  if (grid) {
    for (let i = 0; i < rows; i++) {
      const gridCol = [];
      for (let j = 0; j < cols; j++) {
        if (grid[cols * i + j] === 0) {
          gridCol.push(
            <div key={j} style={whiteBoxStyle} onClick={makeHandleBoxClick(i, j)}></div>);
        } else {
           gridCol.push(
            <div key={j} style={blackBoxStyle} onClick={makeHandleBoxClick(i, j)}></div>);
        }
      }
      gridRender.push(<div key={i}>{gridCol}</div>)
    }
  }

  return (
    <div className="App">
      <div style={{marginTop: '100px'}}>
        Num Rows: <input value={rows} onChange={(event) => {setRows(event.target.value)}}/>
        Num Cols: <input value={cols} onChange={(event) => {setCols(event.target.value)}}/>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleRandomize}>Randomize</button>
      </div>
      <div style={{marginTop: '100px'}}>
        {gridRender}     
      </div>
    </div>
  );
}

export default App;
