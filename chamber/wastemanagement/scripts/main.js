// main.js

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  const tipsContainer = document.getElementById("tips-container");
  const modal = document.getElementById("info-modal");
  const modalBody = document.getElementById("modal-body");
  const closeModal = document.getElementById("close-modal");

  fetch("data/tips.json")
    .then((res) => res.json())
    .then((data) => {
      data.tips.forEach((tip) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${tip.title}</h3>
          <p>${tip.summary}</p>
          <button class="more-info">More Info</button>
        `;
        card.querySelector(".more-info").addEventListener("click", () => {
          modalBody.innerHTML = `<h3>${tip.title}</h3><p>${tip.details}</p>`;
          modal.showModal();
        });
        tipsContainer.appendChild(card);
      });
    });

  closeModal.addEventListener("click", () => {
    modal.close();
  });

  document.getElementById("subscribe-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    localStorage.setItem("subscribedEmail", email);
    alert("Thank you for subscribing!");
    e.target.reset();
  });
});
