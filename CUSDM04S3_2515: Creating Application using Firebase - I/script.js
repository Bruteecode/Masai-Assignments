let currentPage = 1;
const gallery = document.getElementById("gallery");
const pageNumber = document.getElementById("pageNumber");

document.getElementById("nextBtn").addEventListener("click", () => {
  currentPage++;
  loadCharacters(currentPage);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters(currentPage);
  }
});

function loadCharacters(page = 1) {
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      gallery.innerHTML = "";
      data.results.forEach((char) => {
        const card = document.createElement("div");
        card.className = "character-card";
        card.innerHTML = `
          <img src="${char.image}" />
          <h3>${char.name}</h3>
          <p>${char.species} - ${char.status}</p>
        `;
        card.onclick = () => {
          window.open(`character.html?id=${char.id}`, "_blank");
        };
        gallery.appendChild(card);
      });
      pageNumber.textContent = page;
    });
}

function updateClock() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString(undefined, options);
  document.getElementById("clock").textContent = `${timeString} ${dateString}`;
}
setInterval(updateClock, 1000);
updateClock();

loadCharacters();