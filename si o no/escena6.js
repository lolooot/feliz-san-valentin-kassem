const player = document.getElementById("player");
const goal = document.getElementById("goal");
const obstacles = document.querySelectorAll(".obstacle");
const message = document.getElementById("message");

let isDragging = false;

// Mueve el jugador con el mouse o el dedo
player.addEventListener("mousedown", (e) => startDrag(e));
player.addEventListener("touchstart", (e) => startDrag(e));

function startDrag(e) {
    isDragging = true;
    document.addEventListener("mousemove", movePlayer);
    document.addEventListener("touchmove", movePlayer);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
}

function movePlayer(e) {
    if (!isDragging) return;

    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;

    let container = document.getElementById("game-container");
    let rect = container.getBoundingClientRect();

    // Ajustar la posición dentro del contenedor
    let newX = x - rect.left - (player.clientWidth / 2);
    let newY = y - rect.top - (player.clientHeight / 2);

    // Límites del contenedor
    if (newX < 0) newX = 0;
    if (newX > rect.width - player.clientWidth) newX = rect.width - player.clientWidth;
    if (newY < 0) newY = 0;
    if (newY > rect.height - player.clientHeight) newY = rect.height - player.clientHeight;

    player.style.left = `${newX}px`;
    player.style.top = `${newY}px`;

    checkCollision();
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", movePlayer);
    document.removeEventListener("touchmove", movePlayer);
}

// Verifica colisiones con obstáculos y meta
function checkCollision() {
    let playerRect = player.getBoundingClientRect();
    let goalRect = goal.getBoundingClientRect();

    // Si llega a la meta
    if (playerRect.left >= goalRect.left - 10 && playerRect.top >= goalRect.top - 10) {
        message.textContent = "¡Ganaste! Redirigiendo...";
        setTimeout(() => {
            window.location.href = "escena7.html"; // Redirige a la escena 7
        }, 2000);
        return;
    }

    // Si toca un obstáculo
    for (let obstacle of obstacles) {
        let obsRect = obstacle.getBoundingClientRect();
        if (
            playerRect.left < obsRect.right &&
            playerRect.right > obsRect.left &&
            playerRect.top < obsRect.bottom &&
            playerRect.bottom > obsRect.top
        ) {
            message.textContent = "¡Perdiste! Inténtalo de nuevo.";
            setTimeout(() => {
                location.reload(); // Reinicia el juego
            }, 1500);
            return;
        }
    }
}