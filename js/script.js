const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30

const snake = [
    { x: 200, y: 200},
    { x: 230, y: 200}
]

let direction 

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
        snake.push({ x: head.x, y: head.y+30})
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y-30})
    }

    snake.shift()
}

const gameLoop = () => {
    ctx.clearRect(0, 0, 600, 600)

    moveSnake()
    drawSnake()

    setTimeout(() => {
        gameLoop()
    }, 300)
}

gameLoop()