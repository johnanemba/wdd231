// scripts/localdisposal.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/disposal.json")
    .then(response => response.json())
    .then(data => displayResources(data))
    .catch(error => console.error("Error loading disposal data:", error));
});

function displayResources(resources) {
  const section = document.querySelector(".grid-layout");

  resources.forEach(resource => {
    const card = document.createElement("div");
    card.classList.add("resource-card");

    card.innerHTML = `
      <h3>${resource.name}</h3>
      <p><strong>Type:</strong> ${resource.type}</p>
      <p><strong>Location:</strong> ${resource.location}</p>
      <p><strong>Hours:</strong> ${resource.hours}</p>
      <a href="${resource.website}" target="_blank">Visit Website</a>
    `;

    section.appendChild(card);
  });
}
