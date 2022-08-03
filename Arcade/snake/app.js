// Game states
const PLAYING = 'PLAYING'
const GAME_OVER = 'GAME_OVER'
const NEW = "NEW"
// Directions
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const UP ='UP'
const DOWN = 'DOWN'

let gameState = {}

function newBoard() {
    return [
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    ]
  }
// 0 - 13
// function that will setup initial game state
function resetInitialState() {
 gameState.board = newBoard(),
 gameState.apple = [5,5], // can be random but its a good place to start
 gameState.snake = {
    body: [
        [10,8],
        [10,9],
        [10,10],
        [10,11]
    ],
    // direction is going to change by one
    // 1 means its going forward (towards the right on the x axis/down on the y axis)
    // -1 means its going backawrds (towards the left on the x axis/up on the y axis)
    // 0 means it stays in the same position
    nextDirection: [ 0, -1 ]
 },
 gameState.speed = 300
 gameState.phase = NEW
 gameState.setInterval = null
}

let scoreCounter = 0
const score = document.getElementById('score')

function moveSnake (){

    const [y,x] = gameState.snake.body[0] // head of the snake [10,5]
    const nextTile = [
        y + gameState.snake.nextDirection[0],
        x + gameState.snake.nextDirection[1]
    ]
    const [nextY, nextX] = nextTile
    
    if (nextY > 13 || nextY < 0 || nextX > 13 || nextX < 0){ // prevents snake from leaving the border of the grid
        changePhaseTo(GAME_OVER)
        gameControls.style.display = 'none'
        main.style.boxShadow = '10px 10px 10px red'
        failure.style.display = 'flex'
        failure.style.fontSize = '4rem'
        failure.innerText = 'You tried to run off the board!'
        restart.style.display = 'flex'
    } else if (gameState.board[nextY][nextX] === 'snake'){
        changePhaseTo(GAME_OVER)
        gameControls.style.display = 'none'
        main.style.boxShadow = '10px 10px 10px red'
        failure.style.display = 'flex'
        failure.style.fontSize = '4rem'
        failure.innerText = 'You collided with yourself!'
        restart.style.display = 'flex'
    }  else {
        if (gameState.board[nextY][nextX] === 'apple'){ // if the next x,y coordinates are equal to apple, apple moves, score goes up
        
        moveApple()
        scoreCounter += 1
        score.innerText = 'Score: ' + scoreCounter

    } else { // if next coordinates do not equal apple, snake does not grow
        gameState.snake.body.pop()
    }}

    gameState.snake.body.unshift(nextTile)

    gameState.board = newBoard()
    addSnakeToBoard()
    addAppleToBoard()
}

function clearHTMLboard(){
    // removing the snake from the HTML board

    const appleElem = document.getElementsByClassName("apple")[0]
    const snakeElem = document.getElementsByClassName("snake")

    appleElem.classList.remove('apple')
    for (let i = 0; i < snakeElem.length; i++){
        
        snakeElem[i].classList.remove('snake') // add conditionals to remove snake depending on direction
        // snakeElem[i].style.backgroundImage = 'none'
    }
}

function tick(){

    clearHTMLboard()
    moveSnake()
    updateHTMLBoard()

}

function changePhaseTo(newPhase){
    gameState.phase = newPhase

    if(gameState.phase === PLAYING){
        gameState.interval = setInterval(tick, gameState.speed)
    } else if (gameState.phase === GAME_OVER){
        clearInterval(gameState.interval)
    }
}

function addAppleToBoard(){
    const [y, x] = gameState.apple
    gameState.board[y][x] = "apple"
}

function addSnakeToBoard(){
    for(let i = 0; i < gameState.snake.body.length; i++){
        const [y, x] = gameState.snake.body[i]
        gameState.board[y][x] = "snake"
    }
}

function moveApple(){
    let newY = Math.floor(Math.random() * 14);
    let newX = Math.floor(Math.random() * 14);

    gameState.apple = [newY, newX]
}

function updateHTMLBoard() { // this is your renderState function
    let appleCell = document.querySelector("div[data-coordinates='" + gameState.apple + "']" )

    appleCell.classList.add("apple")

    for(let i = 0; i<gameState.snake.body.length; i++ ){

        const[y,x] = gameState.snake.body[i]
        let snakeCell = document.querySelector("div[ data-coordinates='" + y + ',' + x + "']")

        snakeCell.classList.add("snake")
        // snakeCell.style.backgroundImage = 'url(images/snakeHeadLeft.png)'
        // snakeCell.style.backgroundSize = 'cover'

}}
let upButton = document.getElementById('up')
let downButton = document.getElementById('down')
let leftButton = document.getElementById('left')
let rightButton = document.getElementById('right')

window.addEventListener(
    "keydown",
    (e) => {
      if (
        ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(
          e.code
        )
      ) {
        e.preventDefault();
      }
    },
    false
  );
document.onkeydown = function (event) {
    switch (event.keyCode) {
       case 37:
          gameState.snake.nextDirection = [0,-1] //left
          break;
       case 38:
          gameState.snake.nextDirection = [-1,0] // up 
          break;
       case 39:
          gameState.snake.nextDirection = [0,1] // right
          break;
       case 40:
          gameState.snake.nextDirection = [1,0] // down
          break;
    }}

function turnSnake(direction){

    if(direction === UP){
        gameState.snake.nextDirection = [-1,0]
        downButton.disabled = true
        rightButton.disabled = false
        leftButton.disabled = false
        upButton.disabled = false
    } else if (direction === LEFT){
        gameState.snake.nextDirection = [0,-1]
        downButton.disabled = false
        rightButton.disabled = true
        leftButton.disabled = false
        upButton.disabled = false
    } else if (direction === RIGHT){
        gameState.snake.nextDirection = [0,1]
        downButton.disabled = false
        rightButton.disabled = false
        leftButton.disabled = true
        upButton.disabled = false
    } else if (direction === DOWN){
        gameState.snake.nextDirection = [1,0]
        downButton.disabled = false
        rightButton.disabled = false
        leftButton.disabled = false
        upButton.disabled = true
    }

}
const failure = document.getElementById('failure')
const restart = document.getElementById('restart')
const gameControls = document.getElementById('controls')
const startButton = document.querySelector('.start-game')
const prompt = document.getElementById('prompt')
const main = document.getElementsByTagName('main')[0]
const body = document.getElementsByTagName('body')[0]
const mediaQuery = window.matchMedia('(max-width: 1281px')
const headerOne = document.getElementById('headerOne')
const book = document.getElementById('book')
const bookOne = document.getElementById('bookOne')
const nav = document.getElementsByTagName('nav')[0]
const difficulty = document.getElementById('difficulty')
const difficultyOne = document.getElementById('difficultyOne')


book.addEventListener('click', function(){
    
    headerOne.style.width = '25rem'
    book.style.display = 'none'
    bookOne.style.display = 'flex'
    nav.style.display = 'flex'
    
})

bookOne.addEventListener('click', function(){
    nav.style.display = 'none'
    bookOne.style.display = 'none'
    book.style.display = 'flex'
    headerOne.style.width = '3.5rem'
})

startButton.addEventListener('click', function(){
    changePhaseTo(PLAYING)
    
    gameControls.style.display = 'grid'
    prompt.style.display = 'none'
    startButton.style.display = 'none'
    main.style.display = 'grid' 
    body.style.backgroundColor = '#1d1f20'
    score.style.display = 'flex'
    difficulty.style.display = 'none'
    difficultyOne.style.display = 'none'
    inputOne.style.display = 'none'
    inputTwo.style.display = 'none'
    inputThree.style.display = 'none'
    inputFour.style.display = 'none'
    inputFive.style.display = 'none'

    
    if(mediaQuery.matches){
        body.style.backgroundImage = 'none'
        // failure.style.fontSize = '6rem'
    }
})

gameControls.addEventListener('click', function(event){
    if(event.target.tagName !== 'BUTTON'){
        return
    }
    
    let direction = event.target.innerText.toUpperCase()
    turnSnake(direction)
})

restart.addEventListener('click', function(){
    changePhaseTo(NEW)
})

resetInitialState()
updateHTMLBoard()

const inputOne = document.getElementById('gameSpeed1')
const inputTwo = document.getElementById('gameSpeed2')
const inputThree = document.getElementById('gameSpeed3')
const inputFour = document.getElementById('gameSpeed4')
const inputFive = document.getElementById('gameSpeed5')

inputOne.addEventListener('click', function(){
    gameState.speed = 500
})
inputTwo.addEventListener('click', function(){
    gameState.speed = 400
})
inputThree.addEventListener('click', function(){
    gameState.speed = 300
})
inputFour.addEventListener('click', function(){
    gameState.speed = 200
})
inputFive.addEventListener('click', function(){
    gameState.speed = 100
})