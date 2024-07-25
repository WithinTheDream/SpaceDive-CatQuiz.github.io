document.addEventListener('DOMContentLoaded', function() {
    const planets = document.querySelectorAll('.planet');
    const names = document.querySelectorAll('.name');
    const submitButton = document.getElementById('submitButton');

    let draggedElement = null;

    // Setup drag events for planets
    planets.forEach(planet => {
        planet.addEventListener('dragstart', function(event) {
            draggedElement = event.target;
            event.target.classList.add('dragging');
        });

        planet.addEventListener('dragend', function(event) {
            event.target.classList.remove('dragging');
        });
    });

    // Setup drop events for name areas
    names.forEach(name => {
        name.addEventListener('dragover', function(event) {
            event.preventDefault(); // Allow drop
        });

        name.addEventListener('drop', function(event) {
            event.preventDefault();
            const targetName = event.target.dataset.planet;
            const draggedPlanet = draggedElement.dataset.planet;

            // Check if the correct planet was dropped
            if (targetName === draggedPlanet) {
                event.target.textContent = draggedPlanet; // Display the name of the planet
                event.target.style.backgroundColor = '#d0ffd0'; // Change color to indicate correct drop
                draggedElement.style.display = 'none'; // Hide the dragged image
            } else {
                event.target.style.backgroundColor = '#ffd0d0'; // Change color to indicate incorrect drop
            }
        });
    });

    // Submit button logic
    submitButton.addEventListener('click', function() {
        let correctCount = 0;
        names.forEach(name => {
            if (name.textContent) {
                correctCount++;
            }
        });

        if (correctCount === names.length) {
            alert('Congratulations! You have completed Level 3.');
            localStorage.setItem('level3Completed', 'true');
            window.location.href = 'game.html'; // Move to Level 4
        } else {
            alert('Please make sure all planets are correctly matched.');
        }
    });

    function displayNextButton() {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.className = 'next-button';
        nextButton.addEventListener('click', function() {
            window.location.href = 'game.html'; // Redirect to end.html
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
