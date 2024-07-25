document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "Identify this planet:",
            image: "img/saturnus.png",
            choices: ["Jupiter", "Saturn", "Mars", "Venus"],
            correct: "Saturn"
        },
        {
            question: "Which planet is this?",
            image: "img/uranus.png",
            choices: ["Earth", "Neptune", "Uranus", "Mercury"],
            correct: "Uranus"
        },
        {
            question: "This is the image of:",
            image: "img/pluto.png",
            choices: ["Saturn", "Jupiter", "Pluto", "Mars"],
            correct: "Pluto"
        },
        {
            question: "What planet is shown in the image?",
            image: "img/venus.png",
            choices: ["Mercury", "Mars", "Neptune", "Venus"],
            correct: "Venus"
        },
        {
            question: "Name the planet in the picture:",
            image: "img/jupiterr.png",
            choices: ["Jupiter", "Saturn", "Earth", "Mars"],
            correct: "Jupiter"
        }
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    const questionContainer = document.getElementById('questionContainer');
    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');

    function loadQuestion(index) {
        const question = questions[index];
        questionContainer.innerHTML = `
            <p>${question.question}</p>
            <img src="${question.image}" alt="Quiz Image">
            ${question.choices.map(choice => `
                <label>
                    <input type="radio" name="answer" value="${choice}">
                    ${choice}
                </label>
            `).join('')}
        `;
    }

    function checkAnswer() {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer) {
            if (selectedAnswer.value === questions[currentQuestionIndex].correct) {
                correctAnswers++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion(currentQuestionIndex);
                if (currentQuestionIndex === questions.length - 1) {
                    nextButton.style.display = 'none';
                    submitButton.style.display = 'block';
                }
            } else {
                showSummary();
            }
        } else {
            alert("Please select an answer before proceeding!");
        }
    }

    function showSummary() {
        const playerName = localStorage.getItem('playerName') || 'Player';
        const result = {
            player: playerName,
            correctAnswers: correctAnswers,
            totalQuestions: questions.length
        };
        localStorage.setItem('level2Result', JSON.stringify(result));
    
        // Existing summary display code
        questionContainer.innerHTML = `
            <h2>Quiz Summary</h2>
            <p>Player: ${result.player}</p>
            <p>Correct Answers: ${result.correctAnswers} out of ${result.totalQuestions}</p>
        `;
        if (correctAnswers >= 3) {
            localStorage.setItem('level2Completed', 'true');
            questionContainer.innerHTML += `<p>Congratulations! You passed Level 2!</p>`;
            const completeButton = document.createElement('button');
            completeButton.className = 'home';
            completeButton.textContent = 'Complete Level';
            completeButton.addEventListener('click', function() {
                window.location.href = 'game.html';
            });
            questionContainer.appendChild(completeButton);
        } else {
            questionContainer.innerHTML += `
                <p>Sorry, you need at least 3 correct answers to pass Level</p>
                <button id="restartButton" class="home">Restart Level</button>
            `;
            document.getElementById('restartButton').addEventListener('click', function() {
                correctAnswers = 0;
                currentQuestionIndex = 0;
                loadQuestion(currentQuestionIndex);
                nextButton.style.display = 'block';
                submitButton.style.display = 'none';
            });
        }
        submitButton.style.display = 'none';
    }
    

    loadQuestion(currentQuestionIndex);

    nextButton.addEventListener('click', checkAnswer);
    submitButton.addEventListener('click', checkAnswer);

    
});
