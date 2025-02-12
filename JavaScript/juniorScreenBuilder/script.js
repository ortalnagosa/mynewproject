const bgColorInput = document.getElementById("bg-color");
const textInput = document.getElementById("text-input");
const addTextBtn = document.getElementById("add-text-btn");
const resetBtn = document.getElementById("reset-btn");
const previewArea = document.getElementById("preview-area");
const textColorInput = document.getElementById("text-color");
const textSizeInput = document.getElementById("text-size");
const fontFamilyInput = document.getElementById("font-family");
const textAlignInput = document.getElementById("text-align");
const fontWeightInput = document.getElementById("font-weight");
const bgImageInput = document.getElementById("bg-image");

// שינוי צבע רקע
bgColorInput.addEventListener("input", (e) => {
  previewArea.style.backgroundColor = e.target.value;
});

// הוספת טקסט לתצוגה
addTextBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  const textColor = textColorInput.value || "black";
  const textSize = textSizeInput.value || "16"; // גודל ברירת מחדל 16px
  const fontFamily = fontFamilyInput.value;
  const textAlign = textAlignInput.value;
  const fontWeight = fontWeightInput.value;

  if (text) {
    const placeholder = document.querySelector(".placeholder");
    if (placeholder) placeholder.remove();

    // יצירת אלמנט חדש עבור הטקסט
    const textElement = document.createElement("div");
    textElement.textContent = text;
    textElement.style.color = textColor;
    textElement.style.fontSize = `${textSize}px`;
    textElement.style.fontFamily = fontFamily;
    textElement.style.textAlign = textAlign;

    // סגנונות לעובי/עיצוב הפונט
    if (fontWeight === "bold") {
      textElement.style.fontWeight = "bold";
      textElement.style.fontStyle = "normal";
    } else if (fontWeight === "italic") {
      textElement.style.fontStyle = "italic";
      textElement.style.fontWeight = "normal";
    } else {
      textElement.style.fontWeight = "normal";
      textElement.style.fontStyle = "normal";
    }

    // הגדרת class לטקסט
    textElement.className = "user-text";

    // ודא שהטקסט יירד לשורה חדשה
    textElement.style.display = "block";  // גורם לטקסט להיות בשורה חדשה
    textElement.style.marginBottom = "10px"; // רווח קטן בין כל אלמנט טקסט

    previewArea.appendChild(textElement); // הוספת הטקסט לאזור התצוגה

    textInput.value = ""; // איפוס שדה הקלט
    textSizeInput.value = ""; // איפוס גודל הטקסט
  } else {
    checkAndRestorePlaceholder();
  }
});

// שינוי יישור הטקסט
textAlignInput.addEventListener("change", () => {
  const textAlign = textAlignInput.value;
  previewArea.querySelectorAll(".user-text").forEach((textElement) => {
    textElement.style.textAlign = textAlign;
  });
});

// שינוי עובי/עיצוב טקסט לכל האלמנטים הקיימים
fontWeightInput.addEventListener("change", () => {
  previewArea.querySelectorAll(".user-text").forEach((textElement) => {
    if (fontWeightInput.value === "bold") {
      textElement.style.fontWeight = "bold";
      textElement.style.fontStyle = "normal";
      return;
    } 
    if (fontWeightInput.value === "italic") {
      textElement.style.fontStyle = "italic";
      textElement.style.fontWeight = "normal";
      return;
    } 
    if (fontWeightInput.value === "normal"){
      textElement.style.fontWeight = "normal";
      textElement.style.fontStyle = "normal";
    }
  });
});

// העלאת תמונת רקע
bgImageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewArea.style.backgroundImage = `url(${e.target.result})`;
      previewArea.style.backgroundSize = "cover";
      previewArea.style.backgroundPosition = "center";
    };
    reader.readAsDataURL(file);
  }
});

// כפתור איפוס - מאפס הכל!
resetBtn.addEventListener("click", () => {
  previewArea.innerHTML = ""; // איפוס כל הטקסטים
  previewArea.style.backgroundColor = "";
  previewArea.style.backgroundImage = ""; // מחיקת תמונת רקע
  bgColorInput.value = "#ffffff"; // צבע רקע לבן
  textColorInput.value = "#000000"; // צבע טקסט שחור
  textSizeInput.value = "16"; // גודל טקסט ברירת מחדל
  fontFamilyInput.value = "Arial"; // ברירת מחדל לפונט
  textAlignInput.value = "left"; // ברירת מחדל ליישור שמאל
  fontWeightInput.value = "normal"; // ברירת מחדל למשקל פונט
  bgImageInput.value = ""; // איפוס העלאת תמונה

  checkAndRestorePlaceholder(); // החזרת טקסט ברירת מחדל
});

// פונקציה לבדוק אם אין טקסט, ואז להוסיף טקסט ברירת מחדל
function checkAndRestorePlaceholder() {
  if (!previewArea.querySelector(".user-text")) {
    const placeholder = document.createElement("p");
    placeholder.textContent = "Your design will appear here...";
    placeholder.className = "placeholder";
    previewArea.appendChild(placeholder);
  }
}
