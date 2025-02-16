const bgColorInput = document.getElementById("bg-color");
const textInput = document.getElementById("text-input");
const addTextBtn = document.getElementById("add-text-btn");
const resetBtn = document.getElementById("reset-btn");
const previewArea = document.getElementById("preview-area");
const textColorInput = document.getElementById("text-color");
const textSizeInput = document.getElementById("text-size");
const fontFamilyInput = document.getElementById("font-family");
const fontWeightInput = document.getElementById("font-weight");
const bgImageInput = document.getElementById("bg-image");

bgColorInput.addEventListener("input", (e) => {
  previewArea.style.backgroundColor = e.target.value;
});

addTextBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  const textColor = textColorInput.value || "black";
  const textSize = textSizeInput.value || "16";
  const fontFamily = fontFamilyInput.value;
  const fontWeight = fontWeightInput.value;


  if (text) {
    const placeholder = document.querySelector(".placeholder");
    if (placeholder) placeholder.remove();

    const textElement = document.createElement("div");
    textElement.textContent = text;
    textElement.style.color = textColor;
    textElement.style.fontSize = `${textSize}px`;
    textElement.style.fontFamily = fontFamily;
    textElement.style.whiteSpace = "pre-wrap";

    switch (fontWeight) {
      case "bold":
        textElement.style.fontWeight = "bold";
        textElement.style.fontStyle = "normal";
        break;
      case "italic":
        textElement.style.fontStyle = "italic";
        textElement.style.fontWeight = "normal";
        break;
      case "bold-italic":
        textElement.style.fontWeight = "bold";
        textElement.style.fontStyle = "italic";
        break;
      case "underline":
        textElement.style.textDecoration = "underline";
        break;
      default:
        textElement.style.fontWeight = "normal";
        textElement.style.fontStyle = "normal";
    }

    textElement.className = "user-text";
    textElement.style.display = "block";
    textElement.style.margin = "10px";

    previewArea.appendChild(textElement);
    textInput.value = "";
    textSizeInput.value = "";
  } else {
    checkAndRestorePlaceholder();
  }
});

bgImageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const placeholder = document.querySelector(".placeholder");
    if (placeholder) placeholder.remove();
    const reader = new FileReader();
    reader.onload = function (e) {
      previewArea.style.backgroundImage = `url(${e.target.result})`;
      previewArea.style.backgroundSize = "cover";
      previewArea.style.backgroundPosition = "center";
      
    };
    reader.readAsDataURL(file);
  }
  

});

resetBtn.addEventListener("click", () => {
  previewArea.innerHTML = "";
  previewArea.style.backgroundColor = "";
  previewArea.style.backgroundImage = "";
  bgColorInput.value = " ";
  textColorInput.value = " ";
  textSizeInput.value = " ";
  fontFamilyInput.value = " ";
  fontWeightInput.value = " ";
  bgImageInput.value = "";

  checkAndRestorePlaceholder();
});



function checkAndRestorePlaceholder() {
  if (!previewArea.querySelector(".user-text")) {
    const placeholder = document.createElement("p");
    placeholder.textContent = "Your design will appear here...";
    placeholder.className = "placeholder";
    previewArea.appendChild(placeholder);
  }
}
