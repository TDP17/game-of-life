import Cell from '../Game/Cell.js';

export let intervalID = { id: 0 };
export let cellStateGrid = [];
export let neighbourCountGrid = [];
export let displayGrid = [];
export let gridBoundaries = { top: 0, right: 0, bottom: 0, left: 0 };
export let xBoundaryArray = [];
export let yBoundaryArray = [];

/**
 * Initializes empty grids according to row/columns - general function
 * @param {*} rows number of rows of the grid
 * @param {*} columns number of columns of the grid
 */
export const initializeGrids = (rows, columns) => {
    cellStateGrid = Array.from(Array(rows), () => new Array(columns).fill(false));
    neighbourCountGrid = Array.from(Array(rows), () => new Array(columns).fill(0));
    resetCellStateGrid = Array.from(Array(rows), () => new Array(columns).fill(false));
    resetNeighbourCountGrid = Array.from(Array(rows), () => new Array(columns).fill(0));
};

let resetCellStateGrid = [];
let resetNeighbourCountGrid = [];
let resetXBoundaryArray = [];
let resetYBoundaryArray = [];

/**
 * Resets the grids and variables and arrays to their state at iteration 0 (Free mode only)
 * @param {*} rows 
 * @param {*} columns 
 */
export const resetFunction = (rows, columns) => {
    cellStateGrid = resetCellStateGrid;
    neighbourCountGrid = resetNeighbourCountGrid;
    xBoundaryArray = resetXBoundaryArray;
    yBoundaryArray = resetYBoundaryArray;
    isResetStateSaved = false;
}

/**
 * Clears the grids and variables and arrays to their refreshed state
 * @param {*} rows 
 * @param {*} columns 
 */
export const clearFunction = (rows, columns) => {
    initializeGrids(rows, columns);
    xBoundaryArray = [];
    yBoundaryArray = [];
    gridBoundaries.top = gridBoundaries.bottom = gridBoundaries.left = gridBoundaries.right = 0;
    isResetStateSaved = false;
    isGridCreated = false;
    displayGrid = [];
}

let isGridCreated = false;
/**
 * Creates a grid for display only once per mode/level and displays it when called
 * @param {*} rows 
 * @param {*} columns 
 * @param {*} iterationState Boolean containing if the game is running, passed to Cell
 * @param {*} iterationCounter Number containing the number of iterations that took place
 * @param {*} cngrid Classname of the grid 
 * @param {*} cnrow Classname of the row
 */
export const displayGridCells = (rows, columns, iterationState, iterationCounter, cngrid, cnrow) => {
    if (!isGridCreated) {
        for (let i = 0; i < rows; i++) {
            const currentRow = [];
            for (let j = 0; j < columns; j++)
                currentRow.push(<Cell key={Math.random()} rows={rows} columns={columns} i={i} j={j} iterationCounter={iterationCounter} iterationState={iterationState} />);
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

const incrementNeighbour = (x, y) => {
    if (neighbourCountGrid[x] !== undefined)
        if (neighbourCountGrid[x][y] !== undefined)
            neighbourCountGrid[x][y] += 1;
}

export const incrementNeighbours = (i, j) => {
    incrementNeighbour(i - 1, j - 1);
    incrementNeighbour(i - 1, j);
    incrementNeighbour(i - 1, j + 1);
    incrementNeighbour(i, j - 1);
    incrementNeighbour(i, j + 1);
    incrementNeighbour(i + 1, j - 1);
    incrementNeighbour(i + 1, j);
    incrementNeighbour(i + 1, j + 1);
}

const decrementNeighbour = (x, y) => {
    if (neighbourCountGrid[x] !== undefined)
        if (neighbourCountGrid[x][y] !== undefined)
            neighbourCountGrid[x][y] -= 1;
}

export const decrementNeighbours = (i, j) => {
    decrementNeighbour(i - 1, j - 1);
    decrementNeighbour(i - 1, j);
    decrementNeighbour(i - 1, j + 1);
    decrementNeighbour(i, j - 1);
    decrementNeighbour(i, j + 1);
    decrementNeighbour(i + 1, j - 1);
    decrementNeighbour(i + 1, j);
    decrementNeighbour(i + 1, j + 1);
}

const initializeBoundaries = () => {
    gridBoundaries.top = Math.min(...yBoundaryArray);
    gridBoundaries.bottom = Math.max(...yBoundaryArray);
    gridBoundaries.left = Math.min(...xBoundaryArray);
    gridBoundaries.right = Math.max(...xBoundaryArray);
}


let isResetStateSaved = false;
/**
 * Saves the reset state of the grid on the first start
 * @todo complete resetting variables
 */
export const resetState = () => {
    if (!isResetStateSaved) {
        resetNeighbourCountGrid = JSON.parse(JSON.stringify(neighbourCountGrid));
        resetCellStateGrid = JSON.parse(JSON.stringify(cellStateGrid));
        resetXBoundaryArray = JSON.parse(JSON.stringify(xBoundaryArray));
        resetYBoundaryArray = JSON.parse(JSON.stringify(yBoundaryArray));
        isResetStateSaved = true;
    }
}

const addToBoundaryArrays = (incPairI, incPairJ) => {
    if (incPairI !== 0) {
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
}

const removeFromBoundaryArrays = (decPairI, decPairJ) => {
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
}

export let shouldClear = false;
/**
 * Checks if there is any cell alive and modifies the shouldClear variable accordingly
 * @param {*} iStart 
 * @param {*} iEnd 
 * @param {*} jStart 
 * @param {*} jEnd 
 * @todo Make this check more efficient
 */
const shouldClearFunction = (iStart, iEnd, jStart, jEnd, rows, columns) => {
    let innerShouldClear = true;
    for (let i = iStart; i <= iEnd; i++) {
        for (let j = jStart; j <= jEnd; j++) {
            if (cellStateGrid[i][j] === true) {
                innerShouldClear = false;
                break;
            }
        }
    }
    if (innerShouldClear) {
        shouldClear = true;
        clearFunction(rows, columns);
    }
    else
        shouldClear = false;
}

/**
 * Updates the cell grid
 * Updates boundary arrays
 * Updates neighbour grid
 * Checks if the grid is empty
 * @param {*} rows 
 * @param {*} columns 
 */
export const cellStateGridUpdate = (rows, columns) => {
    initializeBoundaries();
    // console.log(JSON.stringify(neighbourCountGrid), cellStateGrid);
    /**
     * Boundaries of the grid to be checked - the way I see it, boxing around the live cells (edges) 
     * will result in better performance since in most cases figures are synmetrical/box-like 
     * @todo Test benchmarks someday
     */
    const iStart = (gridBoundaries.top - 1) < 0 ? 0 : (gridBoundaries.top - 1),
        iEnd = (gridBoundaries.bottom + 1) > rows - 1 ? rows - 1 : (gridBoundaries.bottom + 1),
        jStart = (gridBoundaries.left - 1) < 0 ? 0 : (gridBoundaries.left - 1),
        jEnd = (gridBoundaries.right + 1) > columns - 1 ? columns - 1 : (gridBoundaries.right + 1);

    const iValuesAdded = [];
    const jValuesAdded = [];
    const iValuesRemoved = [];
    const jValuesRemoved = [];

    for (let i = iStart; i <= iEnd; i++) {
        for (let j = jStart; j <= jEnd; j++) {
            if (!cellStateGrid[i][j] && neighbourCountGrid[i][j] === 3) {
                cellStateGrid[i][j] = true;
                iValuesAdded.push(i);
                jValuesAdded.push(j);
            }
            else if (cellStateGrid[i][j] && (neighbourCountGrid[i][j] < 2 || neighbourCountGrid[i][j] > 3)) {
                cellStateGrid[i][j] = false;
                iValuesRemoved.push(i);
                jValuesRemoved.push(j);
            }
        }
    }


    removeFromBoundaryArrays(iValuesRemoved, jValuesRemoved);
    addToBoundaryArrays(iValuesAdded, jValuesAdded);

    for (let k = 0; k < iValuesAdded.length; k++) {
        incrementNeighbours(iValuesAdded[k], jValuesAdded[k]);
    }
    for (let k = 0; k < iValuesRemoved.length; k++) {
        decrementNeighbours(iValuesRemoved[k], jValuesRemoved[k]);
    }

    shouldClearFunction(iStart, iEnd, jStart, jEnd, rows, columns);
}
