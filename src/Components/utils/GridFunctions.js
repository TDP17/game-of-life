/*
CSGU - cellStateGridUpdate function
*/
import Cell from '../Game/Cell.js';

/* EXTRA VARS */
export let intervalID = { id: 0 };

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
export const displayGridCells = (rows, columns, iterationState, iterationCounter, cngrid, cnrow) => {
    if (!isGridCreated) {
        for (let i = 0; i < rows; i++) {
            const currentRow = [];
            for (let j = 0; j < columns; j++)
                currentRow.push(<Cell key={Math.random()} i={i} j={j} iterationState={iterationState} iterationCounter={iterationCounter} />);
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
export let shouldReset = false;
export const cellStateGridUpdate = (rows, columns) => {
    initializeBoundaries();
    const iStart = (gridBoundaries.top - 1) < 0 ? 0 : (gridBoundaries.top - 1),
        iEnd = (gridBoundaries.bottom + 1) > rows - 1 ? rows - 1 : (gridBoundaries.bottom + 1),
        jStart = (gridBoundaries.left - 1) < 0 ? 0 : (gridBoundaries.left - 1),
        jEnd = (gridBoundaries.right + 1) > columns - 1 ? columns - 1 : (gridBoundaries.right + 1);

    const incPairI = [];
    const incPairJ = [];
    const decPairI = [];
    const decPairJ = [];

    console.log(iStart, iEnd, jStart, jEnd);
    for (let i = iStart; i <= iEnd; i++) {
        for (let j = jStart; j <= jEnd; j++) {
            if (!cellStateGrid[i][j] && neighbourCountGrid[i][j] === 3) {
                cellStateGrid[i][j] = true;
                incPairI.push(i);
                incPairJ.push(j);
            }
            else if (cellStateGrid[i][j] && (neighbourCountGrid[i][j] < 2 || neighbourCountGrid[i][j] > 3)) {
                cellStateGrid[i][j] = false;
                decPairI.push(i);
                decPairJ.push(j);
            }
            // For debug purpose only
            // else {
            //     console.log(neighbourCountGrid[i][j], cellStateGrid[i][j], i , j);
            // }
        }
    }

    // Remove all of dec pair - todo
    for (let k = 0; k < decPairI.length; k++) {
        const idx = yBoundaryArray.indexOf(decPairI[k]);
        if (idx > -1) {
            yBoundaryArray.splice(idx, 1);
        }
    }
    for (let k = 0; k < decPairJ.length; k++) {
        const idx = xBoundaryArray.indexOf(decPairJ[k]);
        if (idx > -1) {
            xBoundaryArray.splice(idx, 1);
        }
    }

    // Add largest and smallest i,j of incPair to boundary array
    if (incPairI.length !== 0) {
        const imaxtemp = Math.max(...incPairI);
        const imintemp = Math.min(...incPairI);
        yBoundaryArray.push(imaxtemp);
        yBoundaryArray.push(imintemp);
    }
    if (incPairJ.length !== 0) {
        const jmaxtemp = Math.max(...incPairJ);
        const jmintemp = Math.min(...incPairJ);
        xBoundaryArray.push(jmaxtemp);
        xBoundaryArray.push(jmintemp);
    }

    for (let k = 0; k < incPairI.length; k++) {
        incrementNeighbours(neighbourCountGrid, incPairI[k], incPairJ[k]);
    }
    for (let k = 0; k < decPairI.length; k++) {
        decrementNeighbours(neighbourCountGrid, decPairI[k], decPairJ[k]);
    }

    // console.log("After csgu", neighbourCountGrid, cellStateGrid);

    let innerShouldReset = true;
    for (let i = iStart; i <= iEnd; i++) {
        for (let j = jStart; j <= jEnd; j++) {
            if (cellStateGrid[i][j] === true) {
                innerShouldReset = false;
                break;
            }
        }
    }
    if (innerShouldReset) {
        shouldReset = true;
        resetGrids(rows, columns);
    }
    else
        shouldReset = false;
}
