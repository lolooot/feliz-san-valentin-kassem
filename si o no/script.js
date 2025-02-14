document.addEventListener("DOMContentLoaded", () => {
    const noButton = document.getElementById("noButton");

    noButton.addEventListener("mouseover", () => {
        const maxX = window.innerWidth - noButton.clientWidth;
        const maxY = window.innerHeight - noButton.clientHeight;

        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    });
});
