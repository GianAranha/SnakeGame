const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score--value")
const finalScore = document.querySelector(".final-score > span")
const menu = document.querySelector(".menu-screen")
const buttonPlay = document.querySelector(".btn-play")

const audio = new Audio("../assets/audio.mp3")

const size = 30

let snake = [
    { x: 270, y: 270}
]

const incrementScore = () => {
    score.innerText = parseInt(score.innerText) + 10
}

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max-min) + min)
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width-size)
    return Math.round(number/30) * 30
}
 
const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: "orange"
}

let direction, loopId, scoring = 0

const drawFood = () => {
    ctx.fillStyle = food.color
    ctx.fillRect(food.x, food.y, size, size)
}

const drawSnake = () => {
    ctx.fillStyle = "#ddd"
    
    snake.forEach((pos, index) => {
        if (index == snake.length-1) {
            ctx.fillStyle = "white"
        }
        ctx.fillRect(pos.x, pos.y, size, size)
    })
} 

const moveSnake = () => {
    if(!direction) return

    const head = snake[snake.length-1]

    if (direction == "right") {
        snake.push({ x: head.x+size, y: head.y})
    }

    if (direction == "left") {
        snake.push({ x: head.x-size, y: head.y})
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y+size})
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y-size})
    }

    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i=30; i<canvas.width; i+=30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()
    }
    for (let i=30; i<canvas.width; i+=30) {
        ctx.beginPath()
        ctx.lineTo(0,i)
        ctx.lineTo(600,i)
        ctx.stroke()
    }
}

const checkEat = () => {
    const head = snake[snake.length-1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)
        audio.play()
        incrementScore()

        let x = randomPosition()
        let y = randomPosition()

        while (snake.find((pos) => pos.x == x && pos.y == y)) {
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
        food.color = "orange"
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - size
    const neckIndex = snake.length - 2

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit

    const selfCollision = snake.find((position, index) => {
        return position.x == head.x && position.y == head.y && index < neckIndex
    })

    if(wallCollision || selfCollision) {
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined
    
    menu.style.display = "flex"
    finalScore.innerText = score.innerText
    canvas.style.filter = "blur(2px)"
}

const gameLoop = () => {
    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()
    checkCollision()

    loopId = setTimeout(() => {
        gameLoop()
    }, 250)
}

gameLoop()

document.addEventListener("keydown", ({key}) => {
    console.log(key)
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }
})

buttonPlay.addEventListener("click", () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = "none"

    snake = [{ x: 270, y: 270}]
})