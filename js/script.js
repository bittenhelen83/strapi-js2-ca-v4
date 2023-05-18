import { getExistingFavs } from "./utils/favFunctions.js";

const articleContainer = document.querySelector(".article-container");
const filter = document.querySelector(".filterInput");

const favourites = getExistingFavs();

async function getData(url) {
  const response = await fetch(url);
  const json = await response.json();
  let results = json.data;

  articleContainer.innerHTML = "";

  results.forEach(function (article) {
    let cssClass = "fa-regular";
    const doesObjectExist = favourites.find(function (fav) {
      return fav.title === article.attributes.title;
    });

    if (doesObjectExist) {
      cssClass = "fa-solid";
    }

    articleContainer.innerHTML += `<div class="article">
                                    <h3>${article.attributes.title}</h3>
                                    <div class="author">${article.attributes.author}</div>
                                    <div>${article.attributes.summary}</div>
                                    <i class="${cssClass} fa-heart" data-title="${article.attributes.title}" data-author="${article.attributes.author}" data-summary="${article.attributes.summary}"></i>
                                    </div>`;
  });

  const favButton = document.querySelectorAll(".article i");

  favButton.forEach((btn) => {
    btn.addEventListener("click", handleClick);
  });

  function handleClick() {
    this.classList.toggle("fa-regular");
    this.classList.toggle("fa-solid");

    const title = this.dataset.title;
    const author = this.dataset.author;
    const summary = this.dataset.summary;

    const currentFavs = getExistingFavs();

    const articleExists = currentFavs.find(function (fav) {
      return fav.title === title;
    });

    if (!articleExists) {
      const article = { title: title, author: author, summary: summary };

      currentFavs.push(article);

      saveFavs(currentFavs);
    } else {
      const newFavs = currentFavs.filter((fav) => fav.title !== title);
      saveFavs(newFavs);
    }
  }

  function saveFavs(favs) {
    localStorage.setItem("favourites", JSON.stringify(favs));
  }

  filter.onkeyup = function () {
    const filterValue = event.target.value.trim().toLowerCase();

    const filteredArticles = results.filter(function (art) {
      if (art.attributes.title.toLowerCase().startsWith(filterValue)) {
        return true;
      }
    });
    console.log(filteredArticles);

    results = filteredArticles;
  };
}

getData("http://localhost:1337/api/articles");
