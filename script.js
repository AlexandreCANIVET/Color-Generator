const h1 = document.querySelector("h1");
const toggleButton = document.querySelector("#toggle-btn");
const toggleIcon = document.querySelector("i");
const display = document.querySelector(".display");
const notification = document.querySelector("#notification");

let colorChangeInterval = setInterval(generateColor, 2000);
let toggleButtonActivated = false;

function generateColor() {
  const rgb = ["red", "green", "blue"];
  const colorMaker = rgb.map(
    (color) => (color = Math.floor(Math.random() * 256))
  );
  const colorString = `rgb(${colorMaker.join(",")})`;

  h1.textContent = colorString;
  document.body.style.backgroundColor = colorString;
}

function toggleStopButton() {
  if (toggleButtonActivated) {
    colorChangeInterval = setInterval(generateColor, 2000);
    toggleIcon.classList.replace("fa-play", "fa-pause");
  } else {
    clearInterval(colorChangeInterval);
    toggleIcon.classList.replace("fa-pause", "fa-play");
  }
  toggleButtonActivated = !toggleButtonActivated;
}

function getTextContent() {
  const range = document.createRange();
  range.selectNodeContents(h1);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  navigator.clipboard.writeText(selection.focusNode.textContent);
  showNotification();
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", generateColor);
toggleButton.addEventListener("click", toggleStopButton);
display.addEventListener("click", getTextContent);
