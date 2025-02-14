let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let colorPicker = document.getElementById("colorPicker");
let eraserButton = document.getElementById("eraserButton");
let startDrawingButton = document.getElementById("startDrawingButton");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let timeRemaining = 30;  // Mantén el temporizador de 30 segundos
let timerInterval;
let isEraserActive = false;  // Variable para saber si la goma está activada

function startDrawing() {
    // Inicia el dibujo
    canvas.addEventListener("mousedown", start, false);
    canvas.addEventListener("mousemove", draw, false);
    canvas.addEventListener("mouseup", stop, false);
    canvas.addEventListener("mouseout", stop, false);

    // Inicia el temporizador
    startTimer();
}

function start(event) {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
}

function draw(event) {
    if (!isDrawing) return;

    // Si la goma está activa, dibujamos con el color del fondo (borramos)
    let color = isEraserActive ? "#FFFFFF" : colorPicker.value;  // Si es goma, color blanco
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    lastX = event.offsetX;
    lastY = event.offsetY;
}

function stop() {
    isDrawing = false;
}

// Activamos o desactivamos la goma de borrar
eraserButton.addEventListener("click", function () {
    isEraserActive = !isEraserActive;  // Cambiar el estado de la goma
    eraserButton.style.backgroundColor = isEraserActive ? "#ccc" : "";  // Cambiar el estilo del botón
    alert(isEraserActive ? "Goma de borrar activada" : "Pincel activado");
});

// Inicia el temporizador
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Llevás el talento en la sangre...solo falta que circule.");
            window.location.href = "escena6.html";
        } else {
            timeRemaining--;
            document.getElementById("timer").innerText = timeRemaining;
        }
    }, 1000);
}

// Activar la opción de comenzar a dibujar
startDrawingButton.addEventListener("click", startDrawing);
