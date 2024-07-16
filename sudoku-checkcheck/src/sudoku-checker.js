/**
 * isValidSudoku - check if sudoku is valid
 * @param board
 * @returns {boolean}
 */

function isValidSudoku(board) {
    // Check rows
    for (let i = 0; i < 9; i++) {
      if (!isValidSet(board[i])) return false;
    }

    // Check columns
    for (let i = 0; i < 9; i++) {
      const column = board.map(row => row[i]);
      if (!isValidSet(column)) return false;
    }

    // Check 3x3 sub-grids
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        const subGrid = [];
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            subGrid.push(board[i + x][j + y]);
          }
        }
        if (!isValidSet(subGrid)) return false;
      }
    }

    return true;
  }

  // check if the set is valid
  function isValidSet(arr) {
    const set = new Set(arr);
    return set.size === 9 && !set.has(0);
  }

  module.exports = { isValidSudoku };