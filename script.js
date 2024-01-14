// Create gameboard 3x3
function Gameboard() {
  const board = [];

  for (let i = 0; i < 3; i++) {
    board[i] = [];
    for (let j = 0; j < 3; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const makeMarker = (row, column, player) => {
    board[row][column].addMarker(player);
  }

  const printBoard = () => {
    const boardWithMarkers = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithMarkers);
  };

  return {getBoard, makeMarker, printBoard};
};

// Add cell with ' ', 'X' or 'O' value
function Cell() {
  let value = ' ';

  const addMarker = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addMarker,
    getValue
  };
}

// Control game flow and state
function GameController() {
  const players = [
    {
      name: 'Player one',
      marker: 'X'
    },
    {
      name: 'Player two',
      marker: 'O'
    }
  ];

  const board = Gameboard();
  const currentBoard = board.getBoard();

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  let round = 0;
  let gameOver = false;
  let tie = false;

  const oneMoreRound = () => ++round;
  const getRound = () => round;
  const isGameOver = () => gameOver;
  const isTie = () => tie;

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name}'s marks into row ${row}, column ${column}`);

    const currentCell = currentBoard[row][column].getValue();
      if (currentCell !== ' ') {
        alert('Already marked. Try another!');
        console.log('Already marked. Try another!');
        return;
      };

    board.makeMarker(row, column, getActivePlayer().marker);

    for (let i = 0; i < 3; i++) {
      if ((currentBoard[i][0].getValue() !== ' ')
      && (currentBoard[i][0].getValue() === currentBoard[i][1].getValue())
      && (currentBoard[i][0].getValue() === currentBoard[i][2].getValue()) ||
      (currentBoard[0][i].getValue() !== ' ')
      && (currentBoard[0][i].getValue() === currentBoard[1][i].getValue())
      && (currentBoard[0][i].getValue() === currentBoard[2][i].getValue()) ||
      (currentBoard[0][0].getValue() !== ' ')
      && (currentBoard[0][0].getValue() === currentBoard[1][1].getValue())
      && (currentBoard[0][0].getValue() === currentBoard[2][2].getValue()) ||
      (currentBoard[0][2].getValue() !== ' ')
      && (currentBoard[0][2].getValue() === currentBoard[1][1].getValue())
      && (currentBoard[0][2].getValue() === currentBoard[2][0].getValue())) {
        console.log(`${getActivePlayer().name} is winner! Congratulations!`);
        board.printBoard();
        gameOver = true;
      };
    };

    if (gameOver) {
      console.log('Game is over! Start new game!');
    } else {
      switchPlayerTurn();
      printNewRound();
    };

    oneMoreRound();

    if (getRound() === 9) {
      console.log('It\'s a tie');
      board.printBoard();
      tie = true;
    };
  };

  console.log('Start game!');
  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
    isGameOver,
    isTie
  };
}

// Создание UI
const ScreenController = (function() {
  const game = GameController();

  const newGame = document.querySelector('.game');
  newGame.addEventListener('click', () => {
    location.reload();
  });

  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');


  const updateScreen = () => {
    boardDiv.textContent = ' ';
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
    if (game.isGameOver()) {
      playerTurnDiv.textContent = `${activePlayer.name} wins`;
    }

    if (game.isTie()) {
      playerTurnDiv.textContent = 'It\'s tie';
    }

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = colIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      })
    });
  }

  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    if (!game.isGameOver() && !game.isTie()) {
      game.playRound(selectedRow, selectedColumn);
      updateScreen();
    }
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen(); 

})();