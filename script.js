// Sample baseline dataset of local tennis players
const players = [
    { name: "Alex Mercer", age: 28, gender: "Male", city: "Coquitlam", level: 4.0, intro: "Looking for competitive singles matchplay on weeknights. Reliable server." },
    { name: "Sarah Jenkins", age: 34, gender: "Female", city: "Burnaby", level: 2.5, intro: "Just getting back into tennis after a few years off. Down for casual rallies!" },
    { name: "Taylor Kwok", age: 22, gender: "Non-binary", city: "Coquitlam", level: 5.0, intro: "Ex-varsity player looking for fast-paced hitting drills over the weekends." }
];

// DOM Elements
const playerForm = document.getElementById('playerForm');
const playerGrid = document.getElementById('playerGrid');
const searchCity = document.getElementById('searchCity');
const filterLevel = document.getElementById('filterLevel');

// Render player list to dashboard
function renderPlayers() {
    playerGrid.innerHTML = '';
    
    const cityQuery = searchCity.value.toLowerCase();
    const levelGroup = filterLevel.value;

    players.forEach(player => {
        // Apply search filters
        const matchesCity = player.city.toLowerCase().includes(cityQuery);
        let matchesLevel = true;
        
        if (levelGroup === "1") matchesLevel = player.level <= 2.5;
        else if (levelGroup === "3") matchesLevel = player.level > 2.5 && player.level <= 4.5;
        else if (levelGroup === "5") matchesLevel = player.level >= 5.0;

        if (matchesCity && matchesLevel) {
            const card = document.createElement('div');
            card.className = 'player-card';
            card.innerHTML = `
                <span class="badge">NTRP ${player.level.toFixed(1)}</span>
                <h3>${player.name}</h3>
                <div class="player-meta">${player.gender} • Age ${player.age} • 📍 ${player.city}</div>
                <p class="player-intro">"${player.intro}"</p>
            `;
            playerGrid.appendChild(card);
        }
    });
}

// Handle new sign-ups
playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newPlayer = {
        name: document.getElementById('name').value,
        age: parseInt(document.getElementById('age').value),
        gender: document.getElementById('gender').value,
        city: document.getElementById('city').value,
        level: parseFloat(document.getElementById('level').value),
        intro: document.getElementById('intro').value
    };

    // Add player to memory and refresh feed
    players.unshift(newPlayer);
    renderPlayers();
    
    // Reset inputs and jump to screen view
    playerForm.reset();
    document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
});

// Real-time filtering events
searchCity.addEventListener('input', renderPlayers);
filterLevel.addEventListener('change', renderPlayers);

// Initial Load
renderPlayers();