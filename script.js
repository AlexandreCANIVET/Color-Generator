const h1 = document.querySelector("h1");
const toggleButton = document.querySelector("#play-btn");
const toggleIcon = document.querySelector("i");
const notification = document.querySelector("#notification");
const speedRange = document.querySelector("#speed-slider");
const speedRangeValue = document.querySelector("#slider-label");
const userInterface = document.querySelector(".user-interface");
const textElement = document.querySelector("#instruction-text");

const messages = [
  "Left-click to copy the color",
  "Right-click to hide/show UI",
];
let messageIndex = 0;

const updateMessage = () => {
  textElement.textContent = "";
  const writeMessage = messages[messageIndex];

  writeMessage.split("").forEach((letter, index) => {
    setTimeout(() => {
      textElement.textContent += letter;
    }, 120 * index);
  });

  setTimeout(() => {
    messageIndex = (messageIndex + 1) % messages.length;
    updateMessage();
  }, 10000);
};

updateMessage();

const speedInterval = () => 3000 / Number(speedRange.value);

let colorChangeInterval = setInterval(generateColor, speedInterval());
let toggleButtonActivated = false;

const updateInterval = function () {
  if (toggleButtonActivated) return;
  clearInterval(colorChangeInterval);
  colorChangeInterval = setInterval(generateColor, speedInterval());
};

function generateColor() {
  const rgb = ["red", "green", "blue"];
  const colorMaker = rgb.map(
    (color) => (color = Math.floor(Math.random() * 256))
  );
  const colorString = `rgb(${colorMaker.join(",")})`;

  h1.textContent = colorString;
  document.documentElement.style.setProperty("--dynamic-color", colorString);
}

function toggleStopButton() {
  if (toggleButtonActivated) {
    colorChangeInterval = setInterval(generateColor, speedInterval());
    toggleIcon.classList.replace("fa-play", "fa-pause");
  } else {
    clearInterval(colorChangeInterval);
    toggleIcon.classList.replace("fa-pause", "fa-play");
  }
  toggleButtonActivated = !toggleButtonActivated;
}

function copyColorToClipboard() {
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

document.body.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  userInterface.classList.toggle("display-user-interface");
});

document.body.addEventListener("click", function (e) {
  if (e.target.matches("input,label,i,.range-container")) return;
  copyColorToClipboard();
});
speedRange.addEventListener("input", function () {
  speedRangeValue.textContent = `x${speedRange.value}`;
  updateInterval();
});
