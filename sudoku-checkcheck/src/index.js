import { isValidSudoku } from './sudoku-checker';
require('./styles.css');

// on page load
document.addEventListener('DOMContentLoaded', () => {
  const board = createBoard();
  const checkButton = document.getElementById('check-button');
  const resultElement = document.getElementById('result');

  checkButton.addEventListener('click', () => {
    const sudokuArray = getSudokuArray(board);
    const isValid = isValidSudoku(sudokuArray);
    resultElement.textContent = isValid ? 'Valid Sudoku!' : 'Invalid Sudoku!';
    resultElement.style.color = !isValid ? 'red' : 'green';
  });
});

// create sudoku board
function createBoard() {
  const boardElement = document.getElementById('sudoku-board');
  const board = [];

  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 1;
      input.max = 9;
      boardElement.appendChild(input);
      row.push(input);
    }
    board.push(row);
  }

  return board;
}

function getSudokuArray(board) {
  return board.map(row => row.map(input => parseInt(input.value) || 0));
}