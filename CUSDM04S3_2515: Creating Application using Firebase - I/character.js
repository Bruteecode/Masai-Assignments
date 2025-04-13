const params = new URLSearchParams(window.location.search);
const charId = params.get("id");
const detailsContainer = document.getElementById("characterDetails");

fetch(`https://rickandmortyapi.com/api/character/${charId}`)
  .then((res) => res.json())
  .then((char) => {
    detailsContainer.innerHTML = `
      <img src="${char.image}" />
      <h2>${char.name}</h2>
      <p>Status: ${char.status}</p>
      <p>Species: ${char.species}</p>
      <p>Type: ${char.type || "N/A"}</p>
      <p>Gender: ${char.gender}</p>
      <p>Origin: ${char.origin.name}</p>
      <p>Location: ${char.location.name}</p>
      <p>Episodes: ${char.episode.length}</p>
    `;
  });

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