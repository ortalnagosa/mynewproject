let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
  if (currentPlayer !== 'X' || gameOver) return; // רק המשתמש יכול לשחק

  const index = event.target.getAttribute('data-index');
  if (board[index]) return;

  board[index] = 'X';
  event.target.textContent = 'X';

  if (checkWinner('X')) return;

  currentPlayer = 'O';
  setTimeout(computerMove, 800); 
}

function computerMove() {
  if (gameOver) return;

  let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
  
  if (emptyCells.length === 0) return;

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  board[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';

  checkWinner('O');
  if (!gameOver) currentPlayer = 'X';
}

function checkWinner(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      setTimeout(() => alert(`${player === 'X' ? 'ניצחת!!' : 'הפסדת,נסה שוב!'} `), 100);
      return true;
    }
  }

  if (board.every(cell => cell !== '')) {
    gameOver = true;
    setTimeout(() => alert(`יש פה תיקו!!`), 100);
    return true;
  }

  return false;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
}
