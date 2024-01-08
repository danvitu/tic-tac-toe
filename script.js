// Создание игрового поля 3 х 3.
function Gameboard () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
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

  return {getBoard, makeMarker, printBoard};
}


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


function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
  const board = Gameboard();

  const players = [
    {
      name: playerOneName,
      marker: 'X'
    },
    {
      name: playerTwoName,
      marker: 'O'
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(`${getActivePlayer().name}'s marker into column ${column}, row ${row}`);
    board.makeMarker(row, column, getActivePlayer().marker);
  
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer
  };
}


const game = GameController();
