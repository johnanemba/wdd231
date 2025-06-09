document.addEventListener("DOMContentLoaded", () => {
  // Show Current Time
  const now = new Date();
  const timeElement = document.getElementById("current-time");

  if (timeElement) {
    const options = { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric", 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    timeElement.textContent = now.toLocaleDateString("en-US", options);
  }

  // Load JSON and build cards
  const container = document.querySelector(".discover-grid");

  if (!container) {
    console.error("Container for cards not found!");
    return;
  }

  fetch("data/discover.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure>
            <img src="${item.image}" alt="${item.name} photo" width="300" height="200" loading="lazy" />
          </figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => console.error("Error loading JSON:", error));
});
