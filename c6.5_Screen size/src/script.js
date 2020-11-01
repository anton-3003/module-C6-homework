const btn = document.querySelector(".j-btn-test");

function showMeasurements() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const result = `Ширина экрана: ${screenWidth} пикс.
Высота экрана: ${screenHeight} пикс.`;
    alert(result);
}

btn.addEventListener("click", showMeasurements);