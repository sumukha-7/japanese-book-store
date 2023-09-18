function loadManga(category) {
  window.parent.postMessage(category, "*");
  const mangaContainer =
    window.parent.document.getElementById("mangaContainer");
  mangaContainer.innerHTML = "";

  const apiUrl = `http://localhost:3000/api/manga/${category}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((manga) => {
        const mangaElement = document.createElement("div");
        mangaElement.classList.add("manga");

        const titleElement = document.createElement("h2");
        titleElement.textContent = manga.name;

        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${manga.author}`;

        const tagsElement = document.createElement("p");
        tagsElement.textContent = `Tags: ${manga.tags}`;

        mangaElement.appendChild(titleElement);
        mangaElement.appendChild(authorElement);
        mangaElement.appendChild(tagsElement);

        mangaContainer.appendChild(mangaElement);
      });
    })
    .catch((error) => console.error("Error:", error));
}
