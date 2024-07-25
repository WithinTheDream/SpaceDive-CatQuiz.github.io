document.addEventListener('DOMContentLoaded', function() {
    const playerName = localStorage.getItem('playerName');

    if (!playerName) {
        alert('Please input your name first!');
        window.location.href = 'index.html';
    } else {
        const greetingElement = document.getElementById('greeting');
        greetingElement.innerHTML = `Hello, <span class="player-name">${playerName}!</span> Welcome to Space Dive : CatQuiz`;

        // Initialize progress
        let progress = localStorage.getItem('progress');
        if (!progress) {
            progress = 'level1';
            localStorage.setItem('progress', progress);
        }

        const levels = ['level1', 'level2', 'level3', 'level4', 'bonus', 'end'];

        levels.forEach((level, index) => {
            if (localStorage.getItem(`${level}Completed`) === 'true') {
                const nextLevelIndex = index + 1;
                if (nextLevelIndex < levels.length) {
                    document.getElementById(levels[nextLevelIndex]).style.pointerEvents = 'auto';
                    document.getElementById(levels[nextLevelIndex]).style.opacity = '1';
                }
            }
        });

        levels.forEach(level => {
            const levelButton = document.getElementById(level);
            if (levelButton) {
                levelButton.addEventListener('click', function() {
                    openQuiz(`${level}.html`);
                });
            }
        });

    }
});

function openQuiz(levelPage) {
    const levelPages = {
        'level2.html': 'level1Completed',
        'bonus.html': 'level2Completed',
        'level3.html': 'bonusCompleted',
        'level4.html': 'level3Completed',
        'end.html': 'level4Completed',
        'results.html': 'endCompleted',
        
    };

    if (levelPages[levelPage] && localStorage.getItem(levelPages[levelPage]) !== 'true') {
        alert('Complete the previous level first!');
    } else {
        window.location.href = levelPage;
    }
}

document.getElementById('viewResults').addEventListener('click', function() {
    const allLevelsCompleted = ['level1Completed', 'level2Completed', 'level3Completed', 'level4Completed'].every(item => localStorage.getItem(item) === 'true');
    
    if (allLevelsCompleted) {
        window.location.href = 'results.html';
    } else {
        alert('You need to complete all levels to view the results!');
    }
});




const musicToggleButton = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
        // Music Control


        let musicStarted = false;

        function startMusic() {
            if (!musicStarted) {
                backgroundMusic.play();
                musicStarted = true;
            }
        }
    
        document.addEventListener('click', startMusic, { once: true });
    
        musicToggleButton.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggleButton.textContent = '🔊';
            } else {
                backgroundMusic.pause();
                musicToggleButton.textContent = '🔇';
            }
        });


document.addEventListener('DOMContentLoaded', function() {
    const playerName = localStorage.getItem('playerName');

    if (playerName) {
        const greetingElement = document.getElementById('greeting');
        greetingElement.innerHTML = `Hello, <span class="player-name">${playerName}!</span> Welcome to Space Dive : CatQuiz`;
    } else {
        alert('Please input your name first!');
        window.location.href = 'index.html'; 
    }

    // Tambahkan event listener untuk tombol reset
    const resetButton = document.getElementById('resetProgress');
    resetButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset your progress?')) {
            localStorage.removeItem('level1Completed');
            localStorage.removeItem('level2Completed');
            localStorage.removeItem('level3Completed');
            localStorage.removeItem('level4Completed');
            localStorage.removeItem('bonusCompleted');
            localStorage.removeItem('endCompleted');
            alert('Your progress has been reset.');
            window.location.href = 'game.html';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const viewResults = document.getElementById('viewResults');

    function checkLevelsCompleted() {
        const level1Completed = localStorage.getItem('level1Completed') === 'true';
        const level2Completed = localStorage.getItem('level2Completed') === 'true';
        const level3Completed = localStorage.getItem('level3Completed') === 'true';
        const level4Completed = localStorage.getItem('level4Completed') === 'true';

        return level1Completed && level2Completed && level3Completed && level4Completed;
    }

    if (viewResults) {
        if (checkLevelsCompleted()) {
            viewResults.disabled = false;
            viewResults.addEventListener('click', function() {
                window.location.href = 'results.html';
            });
        } else {
            viewResults.disabled = true;
            viewResults.addEventListener('click', function() {
                alert("Please complete all levels to view the results.");
            });
        }
    }
});


// gameScript.js

// Fungsi untuk menyimpan status level
function markLevelAsCompleted(level) {
    localStorage.setItem('completedLevel', level);
}

// Menandai Level 4 sebagai selesai
document.getElementById('viewResults').addEventListener('click', function() {
    markLevelAsCompleted('end');
    window.location.href = 'results.html'; // Arahkan ke halaman hasil
});


document.getElementById('scrollToSection2').addEventListener('click', function() {
    document.getElementById('section2').scrollIntoView({ behavior: 'smooth' });
});



function checkCompletion() {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    let completed = true;
    
    puzzlePieces.forEach(piece => {
        const pieceNumber = parseInt(piece.getAttribute('data-piece'));
        // Lakukan validasi sesuai dengan kebutuhan
    });

    if (completed) {
        alert('Congratulations! You completed the puzzle!');
    } else {
        alert('The puzzle is not completed yet.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const playerForm = document.getElementById('playerForm');
    const playerNameInput = document.getElementById('playerName');
    const enterGameButton = document.querySelector('.enter-game');

    enterGameButton.addEventListener('click', function(event) {
        event.preventDefault();
        const playerName = playerNameInput.value.trim();
        if (playerName !== '') {
            localStorage.setItem('playerName', playerName);
            window.location.href = 'game.html';
        } else {
            alert('Please input your name!');
        }
    });

    playerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const playerName = playerNameInput.value.trim();
        if (playerName !== '') {
            localStorage.setItem('playerName', playerName);
            window.location.href = 'game.html';
        } else {
            alert('Please input your name!');
        }
    });


});

// gameScript.js

// Fungsi untuk menyimpan status level
function markLevelAsCompleted(level) {
    localStorage.setItem('completedLevel', level);
}

// Event listener untuk tombol View Results
document.getElementById('viewResults').addEventListener('click', function() {
    markLevelAsCompleted('end');
    window.location.href = 'results.html'; // Arahkan ke halaman hasil
});


document.addEventListener('DOMContentLoaded', function() {
    const playerName = localStorage.getItem('playerName');

    if (playerName) {
        const greetingElement = document.getElementById('greeting');
        greetingElement.innerHTML = `Hello, <span class="player-name">${playerName}!</span> Welcome to Space Dive : CatQuiz`;
    } else {
        alert('Please input your name first!');
        window.location.href = 'index.html'; 
    }

    document.getElementById('scrollToSection2').addEventListener('click', function() {
        document.getElementById('section2').scrollIntoView({ behavior: 'smooth' });
    });

    const levels = ['level1', 'level2','bonus', 'level3', 'level4', 'end'];
    levels.forEach(level => {
        const levelCompleted = localStorage.getItem(`${level}Completed`);
        if (!levelCompleted) {
            const levelIndex = levels.indexOf(level);
            for (let i = levelIndex + 1; i < levels.length; i++) {
                document.querySelector(`[onclick="openQuiz('${levels[i]}.html')"]`).style.pointerEvents = 'none';
                document.querySelector(`[onclick="openQuiz('${levels[i]}.html')"]`).style.opacity = '0.5';
            }
            return false;
        }
    });
});
