/*
CSGU - cellStateGridUpdate function
*/
import Cell from '../Game/Cell.js';


/* GRID VARS */
export let cellStateGrid = [];
export let neighbourCountGrid = [];
export let displayGrid = [];

/* BOUNDARY VARS */
export let gridBoundaries = { top: 0, right: 0, bottom: 0, left: 0 };
export let xBoundaryArray = [];
export let yBoundaryArray = [];

export const initializeGrids = (rows, columns) => {
    cellStateGrid = Array.from(Array(rows), () => new Array(columns).fill(false));

    neighbourCountGrid = Array.from(Array(rows), () => new Array(columns).fill(0));

    console.log(cellStateGrid);
};

export const resetGrids = (rows, columns) => {
    cellStateGrid = [];
    neighbourCountGrid = [];
    xBoundaryArray = [];
    yBoundaryArray = [];
    runCountNeighbour = false;
    initializeGrids(rows, columns);
}

// Creates and displays grid, creation fired only once
let isGridCreated = false;
export const displayGridCells = (rows, columns, changeCells, cngrid, cnrow) => {
    if (!isGridCreated) {
        for (let i = 0; i < rows; i++) {
            const currentRow = [];
            for (let j = 0; j < columns; j++)
                currentRow.push(<Cell key={Math.random()} i={i} j={j} changeCells={changeCells} />);
            displayGrid.push(currentRow);
        }
        isGridCreated = true;
    }
    return (
        <div className={`${cngrid}`}>
            {displayGrid.map(row => {
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

const initializeBoundaries = () => {
    gridBoundaries.top = Math.min(...yBoundaryArray);
    gridBoundaries.bottom = Math.max(...yBoundaryArray);
    gridBoundaries.left = Math.min(...xBoundaryArray);
    gridBoundaries.right = Math.max(...xBoundaryArray);
}

/* 
*Should be fired only once when the button is clicked for the first time
*Otherwise cellstategridupdate function takes care of updating cellstate and neighbour count grids
*/
let runCountNeighbour = false;
export const countNeighbours = (rows, columns) => {
    if (!runCountNeighbour) {
        initializeBoundaries();
        const iStart = (gridBoundaries.top - 1) < 0 ? 0 : (gridBoundaries.top - 1),
            iEnd = (gridBoundaries.bottom + 1) > rows - 1 ? rows - 1 : (gridBoundaries.bottom + 1),
            jStart = (gridBoundaries.left - 1) < 0 ? 0 : (gridBoundaries.left - 1),
            jEnd = (gridBoundaries.right + 1) > columns - 1 ? columns - 1 : (gridBoundaries.right + 1);
        for (let i = iStart; i <= iEnd; i++) {
            for (let j = jStart; j <= jEnd; j++) {
                if (cellStateGrid[i][j]) {
                    incrementNeighbours(neighbourCountGrid, i, j);
                }
            }
        }
        runCountNeighbour = true;
    }
};

// O(n^2) look into boxing the live cells and then searching in vicinity --> O(nlogn)?
export const cellStateGridUpdate = (rows, columns) => {
    // console.log("Called 2");
    const iStart = (gridBoundaries.top - 1) < 0 ? 0 : (gridBoundaries.top - 1),
        iEnd = (gridBoundaries.bottom + 1) > rows - 1 ? rows - 1 : (gridBoundaries.bottom + 1),
        jStart = (gridBoundaries.left - 1) < 0 ? 0 : (gridBoundaries.left - 1),
        jEnd = (gridBoundaries.right + 1) > columns - 1 ? columns - 1 : (gridBoundaries.right + 1);

    const incPair = [];
    const decPair = [];

    for (let i = iStart; i <= iEnd; i++) {
        for (let j = jStart; j <= jEnd; j++) {
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
