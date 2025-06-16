const dataUrl = 'data/recycling.json'; // Make sure this path matches your project structure
const container = document.getElementById('recycling-tips');

async function loadRecyclingData() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('recycling-card');

      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <h3>${item.name}</h3>
        <p><strong>Category:</strong> ${item.type}</p>
        <p><strong>Instructions:</strong> ${item.instructions}</p>
        <button class="details-btn" data-id="${item.id}">More Info</button>
      `;

      container.appendChild(card);
    });

    setupModals(data);
  } catch (error) {
    container.innerHTML = `<p class="error">Failed to load recycling tips: ${error.message}</p>`;
    console.error('Error loading recycling data:', error);
  }
}

// Optional: Modal setup for detailed views
function setupModals(data) {
  const buttons = document.querySelectorAll('.details-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = btn.dataset.id;
      const item = data.find(tip => tip.id == itemId);
      if (item) showModal(item);
    });
  });
}

function showModal(item) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" aria-label="Close modal">&times;</span>
      <h2>${item.name}</h2>
      <p><strong>Category:</strong> ${item.type}</p>
      <p>${item.details || item.instructions}</p>
    </div>
  `;

  document.body.appendChild(modal);
  modal.querySelector('.close-btn').focus();

  modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.remove();
  });

  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

loadRecyclingData();
