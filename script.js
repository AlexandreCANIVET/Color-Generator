const h1 = document.querySelector("h1");

function generateColor() {
  const rgb = ["red", "green", "blue"];
  const colorMaker = rgb.map(
    (color) => (color = Math.floor(Math.random() * 256))
  );
  const colorString = `rgb(${colorMaker.join(",")})`;

  h1.textContent = colorString;
  document.body.style.backgroundColor = colorString;
}

document.addEventListener("DOMContentLoaded", function () {
  generateColor();
  setInterval(generateColor, 2000);
});
