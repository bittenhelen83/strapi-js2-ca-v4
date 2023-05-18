import { getExistingFavs } from "./utils/favFunctions.js";

const favourites = getExistingFavs();

const articleContainer = document.querySelector(".article-container");

if (favourites.length === 0) {
  articleContainer.innerHTML = `<div class="message">No favourites yet...</div>`;
}

favourites.forEach((favourite) => {
  articleContainer.innerHTML += `<div class="article">
                                    <h3>${favourite.title}</h3>
                                    <div class="author">${favourite.author}</div>
                                    <div>${favourite.summary}</div>
                                    <i class="fa-solid fa-heart"></i>
                                    </div>`;
});
