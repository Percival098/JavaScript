(function () {
  "use strict";

  const resultContainerEl = document.querySelector(".result");
  const searchInputEl = document.querySelector("#search-input");
  const spinnerEl = document.querySelector(".loader");

  searchInputEl.addEventListener("input", handleSearch);

  function handleSearch() {
    const term = searchInputEl.value.trim();
    if (term === "") {
      resultContainerEl.innerHTML = "";
      return;
    }

    spinnerEl.style.display = "block";

    const endpoint = `https://itunes.apple.com/search?term=${term}&entity=song`;

    fetch(endpoint, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Neuspješan zahtjev");
      }
      return response.json();
    })
    .then((data) => {
      if (data.results.length === 0) {
        resultContainerEl.innerHTML = "<p>Nema pronađenih pjesama s tim imenom.</p>";
      } else {
        renderSongResults(data.results);
      }
      console.log(data.results);
    })
    .catch((error) => {
      console.error("Došlo je do pogreške:", error);
    })
    .finally(() => {
      spinnerEl.style.display = "none";
    });
  
  }

  function renderSongResults(songs) {
    let songsTemplate = "";
    songs.forEach((song) => {
      const songTemplate = createSongTemplate(song);
      songsTemplate += songTemplate;
    });

    resultContainerEl.innerHTML = songsTemplate;
  }

  function createSongTemplate(song) { 
    return `<div class="song-holder"><h4>${song.trackName}</h4>
  <p><b>Artist:</b> ${song.artistName}</p>
  <p><b>Album:</b> ${song.collectionName}</p>
  <img class="song-artwork" src="${song.artworkUrl100}" 
  alt="Song Artwork" /></div>`; }
    return songTemplate;
  }
)();
