// Создание игрового поля 3 х 3.
const Gameboard = (function() {
  const board = [];

  const makeBoard = () => {
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i].push(Cell());
      };
    };
  };

  const getBoard = () => board;

  const makeMarker = (row, column, player) => {
    board[row][column].addMarker(player);
  };
  
  const printBoard = () => {
    const boardWithMarkers = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithMarkers);
  };

  return {makeBoard, getBoard, makeMarker, printBoard};
})();

// Добавление ячейки со значением " ", Х или О в игровое поле
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

// Управление игровым процессом 
function GameController() {
// const GameController = (function () {
  const players = [
    {
      name: 'Player One',
      marker: 'X'
    },
    {
      name: 'Player Two',
      marker: 'O'
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    Gameboard.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  let round = 0;
  const oneMoreRound = () => ++round;
  const getRound = () => round;
  const currentBoard = Gameboard.getBoard();
  // const gameOver = () => 

  const playRound = (row, column) => {

    const currentStatus = currentBoard[row][column].getValue();

    console.log(`${getActivePlayer().name}'s mark into row ${row}, column ${column}`);
    
    if ((currentStatus !== 'X') && (currentStatus !== 'O')) {
      Gameboard.makeMarker(row, column, getActivePlayer().marker);
    } else {
      console.log('Already Marked. Try another.');
      return;
    }

    for (let i = 0; i < 2; i++) {
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
        Gameboard.printBoard();
        return;
      };
    };
    oneMoreRound();

// Проверка на ничью
    if (getRound() === 9) {
      console.log('It\'s tie');
      Gameboard.printBoard();
      return;
    };

    switchPlayerTurn();
    printNewRound();
  };

  console.log('Start game!');
  Gameboard.makeBoard();
  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: Gameboard.getBoard
  };
};

const game = GameController();

Создание UI
const ScreenController = (function() {
  const game = GameController();
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    boardDiv.textContent = ' ';
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name} turn`;

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
    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }

  boardDiv.addEventListener("click", clickHandlerBoard);
  updateScreen();
  
})();
