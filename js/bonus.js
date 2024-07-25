var rows = 3;
var columns = 3;

var currTile;
var otherTile;

var turns = 0;

// Preset image filenames
const imageFilenames = [
    "1.png", "2.png", "3.png",
    "4.png", "5.png", "6.png",
    "7.png", "8.png", "9.png"
];

window.onload = function() {
    // Initialize the 3x3 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./imageonline/blank.png";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    // Shuffle pieces
    let pieces = [...imageFilenames];
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        // Swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./imageonline/" + pieces[i];

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }

    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');

    // Event listener for the "Submit" button
    submitButton.addEventListener('click', function() {
        checkAnswer();
    });
}

// Check if the puzzle is solved
function isPuzzleSolved() {
    const boardTiles = Array.from(document.getElementById('board').children);
    
    for (let i = 0; i < boardTiles.length; i++) {
        let expectedFilename = imageFilenames[i];
        let tileSrc = boardTiles[i].src.split('/').pop();
        if (tileSrc !== expectedFilename) {
            return false; // Puzzle is not solved
        }
    }
    return true; // Puzzle is solved
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

let currentQuestionIndex = 0;
let correctAnswers = 0;
const questionContainer = document.getElementById('questionContainer');
const nextButton = document.getElementById('nextButton');

function loadQuestion(index) {
    const question = questions[index];
    questionContainer.innerHTML = `
        <p>${question.question}</p>
        ${question.choices.map(choice => `
            <label>
                <input type="radio" name="answer" value="${choice}">
                ${choice}
            </label>
        `).join('')}
    `;
}

// Existing code

function checkAnswer() {
    if (isPuzzleSolved()) {
        // Save level completion status to localStorage
        localStorage.setItem('bonusCompleted', 'true');

        // Notify player
        alert('Congratulations! You completed the puzzle!');
        document.getElementById('submitButton').style.display = 'none'; // Hide the submit button

        // Create and display a button to return to the game page
        const returnButton = document.createElement('button');
        returnButton.textContent = 'Back to Game';
        returnButton.id = 'returnButton';
        returnButton.className = 'home';
        returnButton.addEventListener('click', function() {
            window.location.href = 'game.html';
        });

        // Add the return button to the page
        const quizContainer = document.getElementById('quizContainer');
        quizContainer.appendChild(returnButton);
    } else {
        alert('The puzzle is not completed yet.');
    }
}

// Check if the puzzle is solved
function isPuzzleSolved() {
    const boardTiles = Array.from(document.getElementById('board').children);
    
    for (let i = 0; i < boardTiles.length; i++) {
        let expectedFilename = imageFilenames[i];
        let tileSrc = boardTiles[i].src.split('/').pop();
        if (tileSrc !== expectedFilename) {
            return false; // Puzzle is not solved
        }
    }
    return true; // Puzzle is solved
}


