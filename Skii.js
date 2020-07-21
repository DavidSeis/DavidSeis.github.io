function canvas() {
    htmlCanvas = document.getElementById('Skiing');
    context = htmlCanvas.getContext('2d');

    function initialize() {
        // Register an event listener to call the resizeCanvas() function 
        // each time the window is resized.
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();
    }
    initialize();
    // Display custom canvas. In this case it's a blue, 5 pixel 
    // border that resizes along with the browser window.
    function redraw() {
        context.strokeStyle = 'red';
        context.lineWidth = '2';
        context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    }
    // Runs each time the DOM window resize event fires.
    // Resets the canvas dimensions to match window,
    // then draws the new borders accordingly.
    function resizeCanvas() {
        htmlCanvas.width = window.innerWidth;
        htmlCanvas.height = window.innerHeight;
        redraw();
    }

}
canvas();

var c = document.getElementById("Skiing")
var width = c.width
var height = c.height
var ctx = c.getContext("2d")


var level = 0;
var gameOver = false
var score = 0


var state = {
    size: {
        w: 40,
        h: 40,
    },
    position: {
        x: (width / 2),
        y: (height / 2),
    },
    movement: {
        x: 0,
        y: 0,
    },
    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false,
        enter: false,
    },
    sprite: {
        left: "./images/1.3.png",
        default: "./images/4.3.png",
        right: "./images/3.3.png",
        down: "./images/2.3.png"
    },
}
var keyMap = {
    68: 'right',
    39: 'right',
    65: 'left',
    37: 'left',
    87: 'up',
    38: 'up',
    83: 'down',
    40: 'down',
    13: 'enter',
    32: 'pause'
}

function keydown(event) {
    var key = keyMap[event.keyCode]
    state.pressedKeys[key] = true
}

function keyup(event) {
    var key = keyMap[event.keyCode]
    state.pressedKeys[key] = false
    state.movement.x = 0
    state.movement.y = 0
}
window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)



function update(progress) {
    // Make a smaller time value that's easier to work with
    var p = progress / 16

    updateMovement(p)
    updatePosition(p)
}

function updateMovement(p) {
    var acceleration = {
        x: p,
        y: p,
    }

    if (state.pressedKeys.up) {
        state.movement.y -= acceleration.y
    }
    if (state.pressedKeys.down) {
        state.movement.y += acceleration.y
    }
    if (state.pressedKeys.left) {
        state.movement.x -= acceleration.x
    }
    if (state.pressedKeys.right) {
        state.movement.x += acceleration.x
    }

    // Limit movement speed
    if (state.movement.x > 2) {
        state.movement.x = 2
    } else if (state.movement.x < -2) {
        state.movement.x = -2
    }
    if (state.movement.y > 4 + (level / 100)) {
        state.movement.y = 4 + (level / 100)
    } else if (state.movement.y < 1.5 + (level / 100)) {
        state.movement.y = 1.5 + (level / 100)
    }
}

function updatePosition(p) {
    state.position.x += state.movement.x
    state.position.y += state.movement.y

    // Detect boundaries
    if (state.position.x > width) {
        state.position.x = width
    } else if (state.position.x < 0) {
        state.position.x = 0
    }
    if (state.position.y > height) {
        state.position.y -= height
        console.log(level)
        bushesX.length = 0
        bushesY.length = 0
        addBushes(Math.floor(level + ((width * height) / 200000)));
        treesX.length = 0
        treesY.length = 0
        addTrees(level / 3);
        return level++;

    } else if (state.position.y < 0) {
        state.position.y += height;
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height)
    if (level === 0) {
        if (width > 1100 && height > 1100) {
            console.log("Large");
            var img = new Image();
            img.src = "./images/largetitle.png";
            ctx.drawImage(img, 20, 40);
        } else if (width > 800 && height > 800) {
            console.log("medium");
            var img = new Image();
            img.src = "./images/mediumtitle.png";
            ctx.drawImage(img, 20, 40);
        } else if (width > 600 && height > 600) {
            console.log("small");
            var img = new Image();
            img.src = "./images/smalltitle.png";
            ctx.drawImage(img, 20, 40);
        } else {
            console.log("tiny");
            var img = new Image();
            img.src = "./images/tinytitle.png";
            ctx.drawImage(img, 20, 40);
        }
    }
    ctx.save()
    ctx.translate(state.position.x, state.position.y)
    var img = new Image();
    if (state.pressedKeys.right === true) {
        img.src = state.sprite.right;
    } else if (state.pressedKeys.left === true) {
        img.src = state.sprite.left;
    } else if (state.pressedKeys.down === true) {
        img.src = state.sprite.down;
    } else {
        img.src = state.sprite.default;
    }
    ctx.drawImage(img, 0, 0);
    ctx.restore()
}



var bushesX = [];
var bushesY = [];
var treesX = [];
var treesY = [];

function addBushes(M) {
    var placed = 0;
    var max = M
    while (placed < max) {
        bushesX.push(Math.floor(Math.random() * htmlCanvas.width));
        bushesY.push(Math.floor(Math.random() * htmlCanvas.height))
        placed += 1;
    }
}

function addTrees(M) {
    var placed = 0;
    var max = M
    while (placed < max) {
        treesX.push(Math.floor(Math.random() * htmlCanvas.width));
        treesY.push(Math.floor(Math.random() * htmlCanvas.height))
        placed += 1;
    }
}

function drawBushes() {
    var img = new Image();
    img.src = "./images/bush.png";
    for (i = 0; i < bushesX.length; i++) {
        ctx.drawImage(img, bushesX[i], bushesY[i]);
    }
};

function drawTrees() {
    var img = new Image();
    img.src = "./images/tree2.png";
    for (i = 0; i < treesX.length; i++) {
        ctx.drawImage(img, treesX[i], treesY[i]);
    }
};

function collision() {
    for (i = 0; i < bushesX.length; i++) {
        var bush = { x: bushesX[i], y: bushesY[i], w: 5, h: 5 };
        var player = { x: state.position.x, y: state.position.y, w: 20, h: 20 };
        if (bush.x < player.x + player.w && /*left*/
            bush.x + bush.w > player.x && /*right*/
            bush.y < player.y + player.h && /*top*/
            bush.y + bush.h > player.y) /*bottom*/ {
            console.log("game over")
            stopGame();
        }
    };
    for (i = 0; i < treesX.length; i++) {
        var tree = { x: treesX[i], y: treesY[i] + 50, w: 25, h: 30 };
        var player = { x: state.position.x, y: state.position.y, w: 20, h: 20 };
        if (tree.x < player.x + player.w && /*left*/
            tree.x + tree.w > player.x && /*right*/
            tree.y < player.y + player.h && /*top*/
            tree.y + tree.h > player.y) /*bottom*/ {
            console.log("game over")
            stopGame();
        }
    };
}



var startTimer, endTime

function startTime() {
    startTimer = new Date();
}
startTime();

function updateScore() {
    playtime = new Date();
    var timeDiff = (playtime - startTimer) / 10000;
    if (state.pressedKeys.down === true) {
        score += ((Math.round((timeDiff * (level) / 4) * 2)));
    } else {
        score += ((Math.round((timeDiff * (level) / 4) * 1)));
    }

}

function stopGame() {
    ctx.font = "45px bold Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(`Final Score: ${score}`, width / 2, (height / 2) - 50);
    ctx.font = "60px bold Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("OUCH!", width / 2, height / 2);
    ctx.font = "30px bold Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(`Press "ENTER" to play again!`, (width / 2), (height / 2) + 50);
    gameOver = true
}

function statistics() {
    ctx.font = "20px bold Arial";
    ctx.fillStyle = "Blue";
    ctx.textAlign = "right";
    ctx.fillText(`level: ${level}  `, width, 40);
    ctx.font = "20px bold Arial";
    ctx.fillStyle = "Red";
    ctx.textAlign = "right";
    ctx.fillText(`Score: ${score}  `, width, 20);
}

function drawTitle() {
    console.log(width, height)

};
drawTitle();

function loop(timestamp) {
    var progress = timestamp - lastRender
    if (gameOver != true) {
        update(progress);
        draw();
        drawBushes();
        drawTrees();
        collision();
        statistics();
        updateScore();
    }
    if (state.pressedKeys.enter == true) {
        reload()
    }

    lastRender = timestamp
    window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)

function reload() {
    location.reload()
};