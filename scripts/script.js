const cells = document.querySelectorAll('.cell');
const resultMessage = document.getElementById('resultMessage');
const restartButton = document.getElementById('restart');
const xWinsDisplay = document.getElementById('xWins');
const oWinsDisplay = document.getElementById('oWins');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let xWinsCount = 0;
let oWinsCount = 0;

const updateTurnIndicator = () => {
  document.querySelectorAll('.player-indicator').forEach(indicator => {
    indicator.classList.remove('x-indicator', 'o-indicator');
  });

  if (currentPlayer === 'X') {
    xWinsDisplay.nextElementSibling.classList.add('x-indicator');
  } else {
    oWinsDisplay.nextElementSibling.classList.add('o-indicator');
  }
};

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase()); 

  const winningPattern = checkWinner();
  if (winningPattern) {
    resultMessage.textContent = `${currentPlayer} wins!`;
    winningPattern.forEach(index => {
      cells[index].classList.add('winning-cell');
    });

    if (currentPlayer === 'X') {
      xWinsCount++;
      xWinsDisplay.textContent = xWinsCount;
    } else {
      oWinsCount++;
      oWinsDisplay.textContent = oWinsCount;
    }

    restartButton.style.display = 'block'; 
  } else if (board.every(cell => cell)) {
    resultMessage.textContent = 'Draw!';
    restartButton.style.display = 'block'; 
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator(); 
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern;
    }
  }
  return null;
}

restartButton.addEventListener('click', () => {
  board = Array(9).fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell', 'x', 'o');
  });
  currentPlayer = 'X';
  resultMessage.textContent = ''; 
  restartButton.style.display = 'none';
  updateTurnIndicator(); 
});

updateTurnIndicator();
