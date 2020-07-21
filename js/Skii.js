var c = document.getElementById('Skiing');
var ctx = c.getContext('2d');
let score = 0

function initialize() {
    // Register an event listener to call the resizeCanvas() function 
    // each time the window is resized.
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
}
initialize();
// Display custom canvas. In this case it's a blue, 5 pixel 
// border that resizes along with the browser window.


function scoreCheck() {
    if (score < 10000) {
        return "#ff0000";
    };
    if (score < 50000) {
        var grd = ctx.createLinearGradient(0, 0, 0, c.height);
        grd.addColorStop(0, "red");
        grd.addColorStop(.1, "yellow");
        grd.addColorStop(.2, "red");
        grd.addColorStop(.3, "yellow");
        grd.addColorStop(.4, "red");
        grd.addColorStop(.5, "yellow");
        grd.addColorStop(.6, "red");
        grd.addColorStop(.7, "yellow");
        grd.addColorStop(.8, "red");
        grd.addColorStop(.9, "yellow");
        grd.addColorStop(1, "red");
        return grd;
    };
    if (score < 100000) {
        var grd = ctx.createLinearGradient(c.height, 0, 0, 0);
        grd.addColorStop(0, "green");
        grd.addColorStop(.1, "black");
        grd.addColorStop(.2, "green");
        grd.addColorStop(.3, "black");
        grd.addColorStop(.4, "green");
        grd.addColorStop(.5, "black");
        grd.addColorStop(.6, "green");
        grd.addColorStop(.7, "black");
        grd.addColorStop(.8, "green");
        grd.addColorStop(.9, "black");
        grd.addColorStop(1, "green");
        return grd;
    };
    if (score < 150000) {
        var grd = ctx.createLinearGradient(c.height, 0, 0, c.width);
        grd.addColorStop(0, "blue");
        grd.addColorStop(.1, "white");
        grd.addColorStop(.2, "blue");
        grd.addColorStop(.3, "white");
        grd.addColorStop(.4, "blue");
        grd.addColorStop(.5, "white");
        grd.addColorStop(.6, "blue");
        grd.addColorStop(.7, "white");
        grd.addColorStop(.8, "blue");
        grd.addColorStop(.9, "white");
        grd.addColorStop(1, "blue");
        return grd;
    };
    if (score < 300000) {
        var grd = ctx.createLinearGradient(0, 0, ((c.width / 8) * 7), 0);
        grd.addColorStop(0, "magenta");
        grd.addColorStop(.1, "yellow");
        grd.addColorStop(.2, "magenta");
        grd.addColorStop(.3, "yellow");
        grd.addColorStop(.4, "magenta");
        grd.addColorStop(.5, "yellow");
        grd.addColorStop(.6, "magenta");
        grd.addColorStop(.7, "yellow");
        grd.addColorStop(.8, "magenta");
        grd.addColorStop(.9, "yellow");
        grd.addColorStop(1, "Magenta");
        return grd;
    };
    if (score < 450000) {
        var grd = ctx.createLinearGradient(0, 0, ((c.width / 8) * 7), 0);
        grd.addColorStop(0, "gold");
        grd.addColorStop(.1, "purple");
        grd.addColorStop(.2, "gold");
        grd.addColorStop(.3, "purple");
        grd.addColorStop(.4, "gold");
        grd.addColorStop(.5, "purple");
        grd.addColorStop(.6, "gold");
        grd.addColorStop(.7, "purple");
        grd.addColorStop(.8, "gold");
        grd.addColorStop(.9, "purple");
        grd.addColorStop(1, "gold");
        return grd;
    };
};

function redraw() {
    ctx.strokeStyle = scoreCheck();
    ctx.lineWidth = '5';
    ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);
}
// Runs each time the DOM window resize event fires.
// Resets the canvas dimensions to match window,
// then draws the new borders accordingly.
function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    redraw();
}

var state = {
    stats: {
        level: 0,
        gameOver: false,
    },
    position: {
        x: (c.width / 2),
        y: (c.height / 2),
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
        left: "js/images/1.3.png",
        default: "js/images/4.3.png",
        right: "js/images/3.3.png",
        down: "js/images/2.3.png"
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
    if (state.movement.y > 4 + (state.stats.level / 10)) {
        state.movement.y = 4 + (state.stats.level / 10)
    } else if (state.movement.y < 1.5 + (state.stats.level / 25)) {
        state.movement.y = 1.5 + (state.stats.level / 25)
    }
}

function updatePosition(p) {
    state.position.x += state.movement.x
    state.position.y += state.movement.y

    // Detect boundaries
    if (state.position.x > c.width - 35) {
        state.position.x = c.width - 35
    } else if (state.position.x < 0) {
        state.position.x = 0
    }
    if (state.position.y > c.height) {
        state.position.y -= c.height
        bushesX.length = 0
        bushesY.length = 0
        addBushes(Math.floor(state.stats.level + ((c.width * c.height) / 200000)));
        treesX.length = 0
        treesY.length = 0
        addTrees(state.stats.level / 3);
        return state.stats.level++;

    } else if (state.position.y < 0) {
        state.position.y += c.height;
    }
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height)
    redraw();
    resizeCanvas();
    if (state.stats.level === 0) {
        if (c.width > 1200 && c.height > 1200) {
            var img = new Image();
            img.src = "js/images/largetitle.png";
            ctx.drawImage(img, 20, 40);
        } else if (c.width > 1000 && c.height > 1000) {
            var img = new Image();
            img.src = "js/images/mediumtitle.png";
            ctx.drawImage(img, 20, 40);
        } else if (c.width > 800 && c.height > 800) {
            var img = new Image();
            img.src = "js/images/smalltitle.png";
            ctx.drawImage(img, 20, 40);
        } else if (c.width > 600 && c.height > 600) {
            var img = new Image();
            img.src = "js/images/tinytitle.png";
            ctx.drawImage(img, 20, 40);
        } else {
            var img = new Image();
            img.src = "js/images/phone.png";
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
        bushesX.push(Math.floor(Math.random() * c.width));
        bushesY.push(Math.floor(Math.random() * c.height))
        placed += 1;
    }
}

function addTrees(M) {
    var placed = 0;
    var max = M
    while (placed < max) {
        treesX.push(Math.floor(Math.random() * c.width));
        treesY.push(Math.floor(Math.random() * c.height))
        placed += 1;
    }
}

function drawBushes() {
    var img = new Image();
    img.src = "js/images/bush.png";
    for (i = 0; i < bushesX.length; i++) {
        ctx.drawImage(img, bushesX[i], bushesY[i]);
    }
};

function drawTrees() {
    var img = new Image();
    img.src = "js/images/tree2.png";
    for (i = 0; i < treesX.length; i++) {
        ctx.drawImage(img, treesX[i], treesY[i]);
    }
};

function collision() {
    for (i = 0; i < bushesX.length; i++) {
        var bush = { x: bushesX[i], y: bushesY[i], w: 15, h: 10 };
        var player = { x: state.position.x, y: state.position.y, w: 20, h: 20 };
        if (bush.x < player.x + player.w && /*left*/
            bush.x + bush.w > player.x && /*right*/
            bush.y < player.y + player.h && /*top*/
            bush.y + bush.h > player.y) /*bottom*/ {
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
        score += ((Math.round((timeDiff * (state.stats.level) / 4) * 2)));
    } else {
        score += ((Math.round((timeDiff * (state.stats.level) / 4) * 1)));
    }

}
var song = new Audio('js/Sound/combined.m4a');
var over = new Audio('js/Sound/Gameover3.m4a')

song.play()

function stopGame() {
    ctx.font = "45px bold Arial";
    ctx.fillStyle = scoreCheck();
    ctx.textAlign = "center";
    ctx.fillText(`Final Score: ${score}`, c.width / 2, (c.height / 2));
    ctx.font = "60px bold Arial";
    ctx.fillStyle = scoreCheck();
    ctx.textAlign = "center";
    ctx.fillText("OUCH!", c.width / 2, (c.height / 2) - 65);
    ctx.font = "30px bold Arial";
    ctx.fillStyle = scoreCheck();
    ctx.textAlign = "center";
    ctx.fillText(`Press "ENTER" to play again!`, (c.width / 2), (c.height / 2) + 50);
    state.stats.gameOver = true
    song.pause()
    over.play()
}

function statistics() {
    ctx.font = "20px bold Arial";
    ctx.fillStyle = scoreCheck();
    ctx.textAlign = "right";
    ctx.fillText(`Level: ${state.stats.level}  `, c.width, 40);
    ctx.font = "20px bold Arial";
    ctx.fillStyle = scoreCheck();
    ctx.textAlign = "right";
    ctx.fillText(`Score: ${score}  `, c.width, 20);
}

function loop(timestamp) {
    var progress = timestamp - lastRender
    if (state.stats.gameOver != true) {
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
    scoreCheck();
}
var lastRender = 0
window.requestAnimationFrame(loop)


function reload() {
    location.reload()
};