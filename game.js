const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let p1 = {
    x: 150,
    y: 380,
    width: 50,
    height: 80,
    health: 100,
    speed: 5
};

let p2 = {
    x: 700,
    y: 380,
    width: 50,
    height: 80,
    health: 100,
    speed: 5
};

let keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

function drawPlayer(player, color) {
    ctx.fillStyle = color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function attack(attacker, defender) {
    let distance = Math.abs(
        (attacker.x + attacker.width / 2) -
        (defender.x + defender.width / 2)
    );

    if (distance < 100) {
        defender.health -= 1;
    }
}

function update() {

    // Player 1
    if (keys["a"]) p1.x -= p1.speed;
    if (keys["d"]) p1.x += p1.speed;

    // Player 2
    if (keys["ArrowLeft"]) p2.x -= p2.speed;
    if (keys["ArrowRight"]) p2.x += p2.speed;

    if (keys["f"]) attack(p1, p2);
    if (keys["l"]) attack(p2, p1);

    p1.x = Math.max(0, Math.min(canvas.width - p1.width, p1.x));
    p2.x = Math.max(0, Math.min(canvas.width - p2.width, p2.x));
}

function drawHealth() {
    ctx.fillStyle = "red";
    ctx.fillRect(50, 30, 300, 25);

    ctx.fillStyle = "green";
    ctx.fillRect(50, 30, p1.health * 3, 25);

    ctx.fillStyle = "red";
    ctx.fillRect(550, 30, 300, 25);

    ctx.fillStyle = "green";
    ctx.fillRect(550, 30, p2.health * 3, 25);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.fillRect(0, 460, canvas.width, 40);

    update();

    drawPlayer(p1, "blue");
    drawPlayer(p2, "red");
    drawHealth();

    requestAnimationFrame(gameLoop);
}

gameLoop();
