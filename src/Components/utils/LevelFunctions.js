export const compareGrids = (idealGrid, userGrid, userBorders) => {
    let idealCellZero = { i: 0, j: 0 }, userCellZero = { i: 0, j: 0 };

    console.log(idealGrid, userGrid, userBorders);
    // let temp = false;
    // for (let i = 0; i < 15; i++) {
    //     for (let j = 0; j < 25; j++) {
    //         if (idealGrid[i][j] === 1) {
    //             idealCellZero = { i: i, j: j };
    //             temp = true;
    //             break;
    //         }
    //     }
    //     if (temp)
    //         break;
    // }
    // temp = false;
    // for (let i = 0; i < 15; i++) {
    //     for (let j = 0; j < 25; j++) {
    //         if (userGrid[i][j] === 1) {
    //             userCellZero = { i: i, j: j };
    //             temp = true;
    //             break;
    //         }
    //     }
    //     if (temp)
    //         break;
    // }


}

// First level grid and border
export const grid_l1 = Array.from(Array(15), () => new Array(25).fill(false));
grid_l1[0][0] = true;
grid_l1[0][1] = true;
const b1 = { top: 0, right: 1, bottom: 1, left: 0 };