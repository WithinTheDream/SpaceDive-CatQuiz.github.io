document.addEventListener('DOMContentLoaded', function() {
    const resultsContainer = document.getElementById('resultsContainer');
    const homeButton = document.getElementById('homeButton');

    // Retrieve results from localStorage
    const level1Completed = localStorage.getItem('level1Completed') === 'true' ? 'Completed' : 'Not Completed';
    const level2Completed = localStorage.getItem('level2Completed') === 'true' ? 'Completed' : 'Not Completed';
    const level3Completed = localStorage.getItem('level3Completed') === 'true' ? 'Completed' : 'Not Completed';
    const level4Completed = localStorage.getItem('level4Completed') === 'true' ? 'Completed' : 'Not Completed';

    resultsContainer.innerHTML = `
        <h3>Level Results:</h3>
        <p>Level 1: ${level1Completed}</p>
        <p>Level 2: ${level2Completed}</p>
        <p>Level 3: ${level3Completed}</p>
        <p>Level 4: ${level4Completed}</p>
    `;

    if (level1Completed === 'Completed' &&
        level2Completed === 'Completed' &&
        level3Completed === 'Completed' &&
        level4Completed === 'Completed') {
        resultsContainer.innerHTML += `
            <h3>Congratulations!</h3>
            <p>You have successfully completed all levels!</p>
        `;
    }

    homeButton.addEventListener('click', function() {
        window.location.href = 'index.html'; // Redirect to the home page
    });
});
