import { gridBoundaries, initializeBoundaries } from "./GridFunctions";

export const compareGrids = (idealGrid, userGrid, level) => {
    initializeBoundaries();

    let b;
    if (level === 1)
        b = { top: 0, right: 1, bottom: 1, left: 0 };
    else if (level === 2)
        b = { top: 0, right: 4, bottom: 4, left: 0 };

    let heightIdeal = b.top - b.bottom;
    let heightUser = gridBoundaries.top - gridBoundaries.bottom;
    let widthIdeal = b.left - b.right;
    let widthUser = gridBoundaries.left - gridBoundaries.right;

    // console.log(idealGrid, userGrid);
    // console.log(heightUser, heightIdeal);
    // console.log(widthUser, widthIdeal);
    // console.log(JSON.stringify(b));
    // console.log(JSON.stringify(gridBoundaries));

    if (heightIdeal === heightUser && widthIdeal === widthUser) {
        for (let i = b.top, i2 = gridBoundaries.top; i <= b.bottom && i2 <= gridBoundaries.bottom; i++, i2++) {
            for (let j = b.left, j2 = gridBoundaries.left; j <= b.right, j2 <= gridBoundaries.right; j++, j2++) {
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
 * Level grids
 * @todo Make this a class
 */
export const grid_l1 = Array.from(Array(15), () => new Array(25).fill(false));
grid_l1[0][0] = true;
grid_l1[0][1] = true;
grid_l1[1][0] = true;
grid_l1[1][1] = true;

export const grid_l2 = Array.from(Array(15), () => new Array(25).fill(false));
grid_l2[0][2] = true;
grid_l2[1][1] = true;
grid_l2[1][3] = true;
grid_l2[2][0] = true;
grid_l2[2][4] = true;
grid_l2[3][1] = true;
grid_l2[3][3] = true;
grid_l2[4][2] = true;