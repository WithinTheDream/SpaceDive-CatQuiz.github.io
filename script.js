document.addEventListener("DOMContentLoaded", function() {
    const centerSquare = document.querySelector(".center-square");
    setTimeout(() => {
        centerSquare.classList.add("visible");
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
     // Memilih tombol "Enter the Game"

    //event listener tombol Enter the Game
    enterGameButton.addEventListener('click', function(event) {
        event.preventDefault();
        const playerName = playerNameInput.value.trim(); 

        if (playerName !== '') {
            localStorage.setItem('playerName', playerName);
            window.location.href = 'game.html';
        } else {
            alert('Please input your namee!');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const playerForm = document.getElementById('playerForm');
    const playerNameInput = document.getElementById('playerName');
    const enterGameButton = document.querySelector('.enter-game');
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

    

    const resetButton = document.getElementById('resetProgress');
    resetButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset your progress?')) {
            localStorage.clear();
            alert('Your progress has been reset.');
        }
    });
});
