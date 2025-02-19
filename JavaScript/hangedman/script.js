const categories = {
    fruits: ["תפוח", "בננה", "גזר", "מלפפון", "אננס","עגבניה","בצל","חסה","תות"],
    animals: ["פיל", "אריה", "ג'ירפה", "צב", "כלב","חמור","דג","נמר","ארנב","נחש"],
    cars: ["טויוטה", "מרצדס", "פורד", "הונדה", "סובארו","יונדאי","מאזדה","BMW"]
};
let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

function startGame() {
    const category = document.getElementById("category").value;
    selectedWord = categories[category][Math.floor(Math.random() * categories[category].length)];
    guessedLetters = [];
    wrongGuesses = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateWordDisplay();
    createLetterButtons();
}

function updateWordDisplay() {
    document.getElementById("word-display").innerHTML = selectedWord
        .split("")
        .map(letter => guessedLetters.includes(letter) ? letter : "_")
        .join(" ");
}

function handleLetterClick(event) {
    const letter = event.target.textContent;
    if (!letter || guessedLetters.includes(letter)) return;
    guessedLetters.push(letter);
    event.target.classList.add("disabled");
    event.target.disabled = true;
    
    if (!selectedWord.includes(letter)) {
        wrongGuesses++;
        drawHangman(wrongGuesses);
    }
    updateWordDisplay();
    checkGameStatus();
}

function drawHangman(stage) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    
    if (stage === 1) ctx.strokeRect(100, 200, 100, 1); 
    if (stage === 2) ctx.strokeRect(150, 50, 1, 150); 
    if (stage === 3) ctx.strokeRect(100, 50, 50, 1); 
    if (stage === 4) ctx.beginPath(), ctx.arc(125, 80, 15, 0, Math.PI * 2), ctx.stroke(); 
    if (stage === 5) ctx.moveTo(125, 95), ctx.lineTo(125, 140), ctx.stroke(); 
    if (stage === 6) ctx.moveTo(125, 110), ctx.lineTo(110, 130), ctx.stroke(), ctx.moveTo(125, 110), ctx.lineTo(140, 130), ctx.stroke(); 
    if (stage === 7) ctx.moveTo(125, 140), ctx.lineTo(110, 180), ctx.stroke(), ctx.moveTo(125, 140), ctx.lineTo(140, 180), ctx.stroke();
}

function checkGameStatus() {
    if (!document.getElementById("word-display").textContent.includes("_")) {
        disableLetterButtons();
        setTimeout(() => alert("ניצחת! 🎉"), 200);
    } else if (wrongGuesses >= 7) {
        disableLetterButtons();
        setTimeout(() => alert(`הפסדת! המילה הייתה: ${selectedWord}`), 200);
    }
}

function createLetterButtons() {
    const lettersContainer = document.getElementById("letters-container");
    lettersContainer.innerHTML = "";
    const letters = "ACBMWOFRDאבגדהוזחטיכלמנסעפצקרשת".split("");
    letters.forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.classList.add("letter-btn");
        button.addEventListener("click", handleLetterClick);
        lettersContainer.appendChild(button);
    });
}

function disableLetterButtons() {
    document.querySelectorAll(".letter-btn").forEach(button => {
        button.disabled = true;
        button.classList.add("disabled");
    });
}