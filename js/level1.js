document.addEventListener('DOMContentLoaded', function() {
    const questions = [
        {
            question: "What is the closest planet to the Sun?",
            choices: ["Venus", "Earth", "Mercury", "Mars"],
            correct: "Mercury"
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Jupiter", "Mars", "Saturn", "Earth"],
            correct: "Mars"
        },
        {
            question: "Which planet has the most extensive ring system?",
            choices: ["Saturn", "Jupiter", "Uranus", "Neptune"],
            correct: "Saturn"
        },
        {
            question: "Which is the largest planet in our solar system?",
            choices: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: "Jupiter"
        },
        {
            question: "Which planet is known as the Earth's twin?",
            choices: ["Mars", "Venus", "Mercury", "Neptune"],
            correct: "Venus"
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
        questionContainer.innerHTML = `
            <h2>Quiz Summary</h2>
            <p>Player: ${localStorage.getItem('playerName')}</p>
            <p>Correct Answers: ${correctAnswers} out of ${questions.length}</p>
        `;
        if (correctAnswers >= 3) {
            localStorage.setItem('level1Result', JSON.stringify({
                player: localStorage.getItem('playerName'),
                correctAnswers: correctAnswers,
                totalQuestions: questions.length
            }));
            localStorage.setItem('level1Completed', 'true');
            questionContainer.innerHTML += `<p>Congratulations! You passed Level 1!</p>`;
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

    function displayNextButton() {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.className = 'next-button';
        nextButton.addEventListener('click', function() {
            window.location.href = 'level2.html'; // Redirect to end.html
        });

        const gameButton = document.createElement('button');
        gameButton.textContent = 'Back to Game';
        gameButton.className = 'back-button';
        gameButton.addEventListener('click', function() {
            window.location.href = 'game.html'; // Redirect to game.html
        });

        document.body.appendChild(nextButton);
        document.body.appendChild(gameButton);
    }
});