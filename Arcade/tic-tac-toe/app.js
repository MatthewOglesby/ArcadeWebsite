const gameboard = document.getElementById("gameboard");
const boxes = Array.from(document.getElementsByClassName("box"));
const restartBtn = document.getElementById("restartBtn");
const playText = document.getElementById("playText");
const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;

const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    if (index < 3) {
      styleString += `border-bottom: 3px solid var(--yellow);`;
    }
    if (index % 3 === 0) {
      styleString += `border-right: 3px solid var(--yellow);`;
    }
    if (index % 3 === 2) {
      styleString += `border-left: 3px solid var(--yellow);`;
    }
    if (index > 5) {
      styleString += `border-top: 3px solid var(--yellow);`;
    }
    box.style = styleString;

    box.addEventListener("click", boxClicked);
  });
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    if (hasPlayerWon(currentPlayer) && currentPlayer === O_TEXT) {
      playText.innerHTML = `${playerOneInput.value} wins!`;
      return;
    } else if (hasPlayerWon(currentPlayer) && currentPlayer === X_TEXT) {
        playText.innerHTML = `${playerTwoInput.value} wins!`;
      return;
    }


    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
  }
}

const hasPlayerWon = (player) => {
  
  if (spaces[0] === player) {
    if (spaces[1] === player && spaces[2] === player) {
      
      return true;
    }
    if (spaces[3] === player && spaces[6] === player) {
      
      return true;
    }
    if (spaces[4] === player && spaces[8] === player) {
      
      return true;
    }
  }
  if (spaces[8] === player) {
    if (spaces[2] === player && spaces[5] === player) {
      return true;
    }
    if (spaces[7] === player && spaces[6] === player) {
      return true;
    }
  }
  if (spaces[4] === player) {
    if (spaces[3] === player && spaces[5] === player) {
      return true;
    }
    if (spaces[1] === player && spaces[7] === player) {
      return true;
    }
  }
  if (spaces[2] === player) {
    if (spaces[4] === player && spaces[6] === player) {
      return true;
    }
  }
};

restartBtn.addEventListener("click", () => {
    playerOneInput.style.display = 'flex'
    playerTwoInput.style.display = 'flex'
    submit.style.display = 'flex'
    playerOneInput.value = 'Player One Name Here'
    playerTwoInput.value = 'Player Two Name Here'

  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
  });
  playText.innerHTML = `Let's Play!!`;

  currentPlayer = O_TEXT;

});

drawBoard();


const playerOneInput = document.getElementById('playerName1')
const playerTwoInput = document.getElementById('playerName2')
const submit = document.getElementById('submit')


playerOneInput.addEventListener('click', function(){
    playerOneInput.value = ''
})
playerTwoInput.addEventListener('click', function(){
    playerTwoInput.value = ''
})
submit.addEventListener('click', function(){
    playerOneInput.style.display = 'none'
    playerTwoInput.style.display = 'none'
    submit.style.display = 'none'
})


const headerOne = document.getElementById('headerOne')
const book = document.getElementById('book')
const bookOne = document.getElementById('bookOne')
const nav = document.getElementsByTagName('nav')[0]

book.addEventListener('click', function () {

    headerOne.style.width = '25rem'
    book.style.display = 'none'
    bookOne.style.display = 'flex'
    nav.style.display = 'flex'

})

bookOne.addEventListener('click', function () {
    nav.style.display = 'none'
    bookOne.style.display = 'none'
    book.style.display = 'flex'
    headerOne.style.width = '3.5rem'
})