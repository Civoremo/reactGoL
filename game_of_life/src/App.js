/** @format */

import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Canvas from "./Canvas";

function App() {
  let size = 100;
  let columns = size;
  let rows = size;
  let grid;

  const create2Dgrid = () => {
    let arr = new Array(columns);
    for (let i = 0; i < columns; i++) {
      arr[i] = new Array(rows);
    }

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        arr[j][i] = Math.floor(Math.random(2) * Math.floor(2));
      }
    }
    return arr;
  };

  const draw2Dgrid = (ctx, newGridRequest) => {
    let cellSize = ctx.canvas.width / size;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 0.5;

    if (newGridRequest === true) {
      grid = create2Dgrid();
    }

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let x = cellSize * i;
        let y = cellSize * j;
        if (grid[j][i] === 1) {
          //alive
          ctx.beginPath();
          ctx.rect(x, y, cellSize, cellSize);
          ctx.fillStyle = "darkgreen";
          ctx.fill();
          ctx.strokeStyle = "gray";
          ctx.stroke();
          ctx.closePath();
        } else if (grid[j][i] === 2) {
          // back from dead
          ctx.beginPath();
          ctx.rect(x, y, cellSize, cellSize);
          ctx.fillStyle = "lightgreen";
          ctx.fill();
          ctx.strokeStyle = "gray";
          ctx.stroke();
          ctx.closePath();
        } else if (grid[j][i] === 3) {
          // died
          ctx.beginPath();
          ctx.rect(x, y, cellSize, cellSize);
          ctx.fillStyle = "darkred";
          ctx.fill();
          ctx.strokeStyle = "gray";
          ctx.stroke();
          ctx.closePath();
        } else {
          // dead
          ctx.beginPath();
          ctx.rect(x, y, cellSize, cellSize);
          ctx.fillStyle = "black";
          ctx.fill();
          ctx.strokeStyle = "gray";
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  };

  const runCellAnimation = (ctx) => {
    let next2Dgrid = create2Dgrid();

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let neighbors = countCellNeighbors(i, j);
        let state = grid[i][j];
        // console.log(state)

        // alive with 2 or 3 neighbors
        // stays alive
        if (state === 1 && (neighbors === 2 || neighbors === 3)) {
          next2Dgrid[i][j] = 1;
        }
        // alive again with 2 or 3 neighbors
        // turns alive
        else if (state === 2 && (neighbors === 2 || neighbors === 3)) {
          next2Dgrid[i][j] = 1;
        }
        // dead with 3 neighbors
        // becomes alive again
        else if (state === 0 && neighbors === 3) {
          next2Dgrid[i][j] = 2;
        }
        // recently alive with 3 neighbors
        // becomes alive
        else if (state === 2 && neighbors === 3) {
          next2Dgrid[i][j] = 1;
        }
        // alive with <2 and >3 neighbors
        // dies
        else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
          next2Dgrid[i][j] = 3;
        } else if (state === 2 && (neighbors < 2 || neighbors > 3)) {
          next2Dgrid[i][j] = 3;
        }
        // recently dead with <2 >3 neighbors
        // dead
        else if (state === 3 && (neighbors < 2 || neighbors > 3)) {
          next2Dgrid[i][j] = 0;
        }
        // all others remain dead
        else {
          next2Dgrid[i][j] = 0;
        }
        // }
      }
    }
    // console.table(next2Dgrid);
    grid = next2Dgrid;
    draw2Dgrid(ctx, false);
  };

  const countCellNeighbors = (x, y) => {
    let sum = 0;

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (x + i >= 0 && x + i < columns && y + j >= 0 && y + j < rows) {
          if (grid[x + i][y + j] === 2) {
            sum += grid[x + i][y + j] - 1;
          } else if (grid[x + i][y + j] === 3) {
            sum += grid[x + i][y + j] - 3;
          } else {
            sum += grid[x + i][y + j];
          }
        }
      }
    }
    if (grid[x][y] === 2) {
      sum -= grid[x][y] - 1;
    } else if (grid[x][y] === 3) {
      sum -= grid[x][y] - 3;
    } else {
      sum -= grid[x][y];
    }
    // console.log(sum);
    return sum;
  };

  return (
    <div>
      <Canvas
        grid={grid}
        create2Dgrid={create2Dgrid}
        initialDraw={draw2Dgrid}
        runCellAnimation={runCellAnimation}
      >
        Canvas is not working on your system!
      </Canvas>
    </div>
  );
}

export default App;
