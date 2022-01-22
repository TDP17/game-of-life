import { gridBoundaries, initializeBoundaries } from "./GridFunctions";

export const compareGrids = (idealGrid, userGrid) => {
    initializeBoundaries();

    let compareGrids;
    let heightIdeal = b1.top - b1.bottom;
    let heightUser = gridBoundaries.top - gridBoundaries.bottom;
    let widthIdeal = b1.left - b1.right;
    let widthUser = gridBoundaries.left - gridBoundaries.right;

    if (heightIdeal === heightUser && widthIdeal === widthUser) {
        for (let i = b1.top, i2 = gridBoundaries.top; i <= b1.bottom && i2 <= gridBoundaries.bottom; i++, i2++) {
            for (let j = b1.left, j2 = gridBoundaries.left; j <= b1.right, j2 <= gridBoundaries.right; j++, j2++) {
                if (idealGrid[i][j] !== userGrid[i2][j2])
                    return false;
            }
        }
    }
    else {
        return false;
    }
    return true;
}

/**
 * Level 1 grid and borders
 * @todo Make this a class
 */
const b1 = { top: 0, right: 1, bottom: 1, left: 0 };
export const grid_l1 = Array.from(Array(15), () => new Array(25).fill(false));
grid_l1[0][0] = true;
grid_l1[0][1] = true;
grid_l1[1][0] = true;
grid_l1[1][1] = true;