const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const canvassize = 600
canvas.width = canvassize
canvas.height = canvassize


const snakebox = 20
const totalmoves = canvassize/snakebox


const apple = new Image()
apple.src = 'images/apple.png'


let dead = new Audio()
let eat = new Audio()
let up = new Audio()
let down = new Audio()
let left = new Audio()
let right = new Audio()


dead.src = 'audio/dead.mp3'
eat.src = 'audio/eat.mp3'
up.src = 'audio/up.mp3'
down.src = 'audio/down.mp3'
left.src = 'audio/left.mp3'
right.src = 'audio/right.mp3'

// snake

let snake = []
snake[0] = {
    x : 9 * snakebox,
    y : 10 * snakebox
}

// food

let food ={}
getFood()

// score

let score = 0

// snake direction 

let dir = ""

document.addEventListener("keydown",direction)

function direction(){
    let key = event.keyCode
    if(key==37 && dir != "RIGHT"){
        dir = "LEFT"
        left.play()
    }
    else if(key==38 && dir !="DOWN"){
        dir = "UP"
        up.play()
    }
    else if(key==39 && dir != "LEFT"){
        dir = "RIGHT"
        right.play()
    }
    else if(key==40 && dir != "UP"){
        dir = "DOWN"
        down.play()
    }
}

function getFood(){
    food = {
        x : Math.floor( Math.random()*(totalmoves-2-3)+3)*snakebox ,
        y : Math.floor( Math.random()*(totalmoves-2-3)+3)*snakebox
    }
}

function collisionDetection(head,ar){
    for(i=0;i<ar.length;i++){
      if(ar[i].x == head.x && ar[i].y ==head.y){
        return true

      }  
    }
    return false

}


function render(){
    ctx.fillStyle ="#dcdcdc"
    ctx.fillRect(0,0,canvassize,canvassize)

    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = i==0?"#4CAF50":"white"
        ctx.fillRect(snake[i].x,snake[i].y,snakebox,snakebox)
        ctx.strokeStyle="#E91E63"
        ctx.strokeRect(snake[i].x,snake[i].y,snakebox,snakebox)
    
    
    }
    ctx.drawImage(apple,food.x,food.y,snakebox,snakebox)
     
    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(dir =="LEFT") snakeX-=snakebox
    if(dir =="RIGHT") snakeX+=snakebox
    if(dir =="UP") snakeY-=snakebox
    if(dir =="DOWN") snakeY+=snakebox
   
   if(snakeX == food.x && snakeY == food.y){
        score++
        eat.play()
        getFood()
   }
   else{
    snake.pop()
   }
     let newHead ={
          x : snakeX,
          y :snakeY

   }
if(snakeX<0 || snakeX>=canvassize || snakeY<0 || snakeY>=canvassize){
    gameOver()
    return
}


   snake.unshift(newHead)

   ctx.fillStyle ="black"
   ctx.font = "40px tahoma "
   ctx.fillText(score,10,40)


}

render()
var gm = setInterval(render,100)

function gameOver(){
    clearInterval(gm)
    dead.play()
    ctx.fillStyle = "black"
    ctx.font = "40px tahoma"
    ctx.fillText("Game Over",canvassize/2-100,canvassize/2)

}
