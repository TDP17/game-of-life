/*
CSGU - cellStateGridUpdate function
*/
import Cell from '../Game/Cell.js';

// Created a blank grid which serves as a canvas and stores it in grid
// Returns the grid
export const createBlankGrid = (rows, columns, cellStateGrid, neighbourCountGrid) => {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        const currentRow = [];
        for (let j = 0; j < columns; j++) {
            currentRow.push(<Cell key={Math.random()} i={i} j={j} cellStateGrid={cellStateGrid} />);
        }
        grid.push(currentRow);
    }
    return grid;
}

// Displays the blank grid passed as parameter, cngrid and cnrow are classnames for styling
export const displayBlankGrid = (grid, cngrid, cnrow) => {
    return (
        <div className={`${cngrid}`}>
            {grid.map(row => {
                return (
                    <div key={Math.random()} className={`${cnrow}`}>
                        {row.map(cell => {
                            return (
                                cell
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
};

// Creates a logical 2D like array for computation and iteration and returns it (mb less resource consuming than maintaing a state)
export const createCellStateGrid = (rows, columns) => {
    const cellStateGrid = Array.from(Array(rows), () => new Array(columns).fill(false));
    return cellStateGrid;
}

export const createNeighbourCountGrid = (rows, columns) => {
    const neighbourCountGrid = Array.from(Array(rows), () => new Array(columns).fill(0));
    return neighbourCountGrid;
}

// This section is very, very ugly and slow but works, refactor someday
// Definitely change running this on every click to running on every start game and eval only "on" cells instead - will do for now
const incrementNeighbour = (neighbourCountGrid, x, y) => {
    if (neighbourCountGrid[x] !== undefined)
        if (neighbourCountGrid[x][y] !== undefined)
            neighbourCountGrid[x][y] += 1;
}

const incrementNeighbours = (neighbourCountGrid, i, j) => {
    incrementNeighbour(neighbourCountGrid, i - 1, j - 1);
    incrementNeighbour(neighbourCountGrid, i - 1, j);
    incrementNeighbour(neighbourCountGrid, i - 1, j + 1);
    incrementNeighbour(neighbourCountGrid, i, j - 1);
    incrementNeighbour(neighbourCountGrid, i, j + 1);
    incrementNeighbour(neighbourCountGrid, i + 1, j - 1);
    incrementNeighbour(neighbourCountGrid, i + 1, j);
    incrementNeighbour(neighbourCountGrid, i + 1, j + 1);
}

const decrementNeighbour = (neighbourCountGrid, x, y) => {
    if (neighbourCountGrid[x] !== undefined)
        if (neighbourCountGrid[x][y] !== undefined)
            neighbourCountGrid[x][y] -= 1;
}

const decrementNeighbours = (neighbourCountGrid, i, j) => {
    decrementNeighbour(neighbourCountGrid, i - 1, j - 1);
    decrementNeighbour(neighbourCountGrid, i - 1, j);
    decrementNeighbour(neighbourCountGrid, i - 1, j + 1);
    decrementNeighbour(neighbourCountGrid, i, j - 1);
    decrementNeighbour(neighbourCountGrid, i, j + 1);
    decrementNeighbour(neighbourCountGrid, i + 1, j - 1);
    decrementNeighbour(neighbourCountGrid, i + 1, j);
    decrementNeighbour(neighbourCountGrid, i + 1, j + 1);
}

/* 
Should be fired only once when the button is clicked for the first time
Otherwise csgu function takes care of updating cellstate and neighbourcount grids
*/ 
var fired = false;
export const countNeighbours = (rows, columns, cellStateGrid, neighbourCountGrid) => {
    if (!fired) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                if (cellStateGrid[i][j]) {
                    incrementNeighbours(neighbourCountGrid, i, j);
                }
            }
        }
        fired = true;
    }
};

// O(n^2) look into boxing the live cells and then searching in vicinity --> O(nlogn)?
export const cellStateGridUpdate = (rows, columns, cellStateGrid, neighbourCountGrid) => {
    const incPair = [];
    const decPair = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (!cellStateGrid[i][j] && neighbourCountGrid[i][j] === 3) {
                cellStateGrid[i][j] = true;
                incPair.push({ i, j });
            }
            else if (cellStateGrid[i][j] && (neighbourCountGrid[i][j] < 2 || neighbourCountGrid[i][j] > 3)) {
                cellStateGrid[i][j] = false;
                decPair.push({ i, j });
            }
            // For debug purpose only
            // else {
            //     console.log(neighbourCountGrid[i][j], cellStateGrid[i][j], i , j);
            // }
        }
    }
    for (const { i, j } of incPair) {
        incrementNeighbours(neighbourCountGrid, i, j);
    }
    for (const { i, j } of decPair) {
        decrementNeighbours(neighbourCountGrid, i, j);
    }
}
