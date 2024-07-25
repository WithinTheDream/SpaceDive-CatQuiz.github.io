document.addEventListener('DOMContentLoaded', function() {
    const planets = document.querySelectorAll('.planet');
    const dropAreas = document.querySelectorAll('.drop-area');
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

    // Setup drop events for drop areas
    dropAreas.forEach(dropArea => {
        dropArea.addEventListener('dragover', function(event) {
            event.preventDefault(); // Allow drop
        });

        dropArea.addEventListener('drop', function(event) {
            event.preventDefault();
            const targetName = event.target.dataset.planet;
            const draggedPlanet = draggedElement.dataset.planet;

            if (targetName === draggedPlanet) {
                event.target.textContent = draggedPlanet; // Display the name of the planet
                event.target.classList.add('correct'); // Add correct class
                event.target.classList.remove('incorrect'); // Remove incorrect class
                draggedElement.style.display = 'none'; // Hide the dragged image
            } else {
                event.target.classList.add('incorrect'); // Add incorrect class
            }
        });
    });

    // Submit button logic
    submitButton.addEventListener('click', function() {
        let correctCount = 0;
        dropAreas.forEach(dropArea => {
            if (dropArea.textContent) {
                correctCount++;
            }
        });

        if (correctCount === dropAreas.length) {
            alert('Congratulations! You have completed Level 4.');
            localStorage.setItem('level4Completed', 'true');
            localStorage.setItem('allLevelsCompleted', 'true');
            submitButton.addEventListener('click', function() {
                window.location.href = 'game.html';
            });
        } else {
            alert('Please make sure all planets are correctly placed in the right order.');
        }
    });

});
