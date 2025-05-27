// ======= Dynamic Footer Dates =======
document.addEventListener("DOMContentLoaded", () => {
  const currentYear = new Date().getFullYear();
  document.getElementById("currentyear").textContent = currentYear;

  const lastModified = document.lastModified;
  document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;

  // Initialize hamburger menu
  setupHamburger();

  // Load spotlight members
  fetchMembersAndDisplay();
});

// ======= Hamburger Menu Toggle =======
function setupHamburger() {
  const button = document.querySelector(".hamburger");
  const nav = document.querySelector("nav ul");

  button.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// ======= Spotlight Member Logic =======
function fetchMembersAndDisplay() {
  fetch("data/members.json") // Path to your JSON file
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch member data");
      }
      return response.json();
    })
    .then((data) => {
      const members = data.members;
      displaySpotlights(members);
    })
    .catch((error) => {
      console.error("Error loading member data:", error);
    });
}

function displaySpotlights(members) {
  const spotlightContainer = document.getElementById("spotlight-container");

  if (!spotlightContainer) return;

  // Filter Gold or Silver members only
  const eligible = members.filter(
    (m) =>
      m.membershipLevel === "Gold" || m.membershipLevel === "Silver"
  );

  // Shuffle and select up to 3
  const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

  // Clear existing content
  spotlightContainer.innerHTML = "";

  selected.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <h3>${member.companyName}</h3>
      <img src="${member.logo}" alt="Logo of ${member.companyName}" loading="lazy">
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Membership:</strong> ${member.membershipLevel}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
    `;

    spotlightContainer.appendChild(card);
  });
}
