const spotlightContainer = document.querySelector('#spotlight');

async function getMemberData() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        displaySpotlights(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displaySpotlights(members) {
    // Clear previous content (important if reused)
    spotlightContainer.innerHTML = '';

    // Filter for Gold and Silver members
    const eligibleMembers = members.filter(member =>
        ['Gold', 'Silver'].includes(member.membership)
    );

    // Shuffle the eligible members
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());

    // Choose 2 or 3 members
    const spotlightCount = Math.floor(Math.random() * 2) + 2;
    const selected = shuffled.slice(0, spotlightCount);

    // Create and display each spotlight card
    selected.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>Phone:</strong> <a href="tel:${member.phone.replace(/\s+/g, '')}">${member.phone}</a></p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
            <p class="membership ${member.membership.toLowerCase()}">Membership: ${member.membership}</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

getMemberData();
