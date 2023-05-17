import { getExistingFavs } from "./utils/favFunctions.js";

const favourites = getExistingFavs();

const articleContainer = document.querySelector(".article-container");

favourites.forEach((favourite) => {
  articleContainer.innerHTML += `<div class="article">
                                    <h3>${favourite.attributes.title}</h3>
                                    <div>${favourite.attributes.author}</div>
                                    <div>${favourite.attributes.summary}</div>
                                    <i class="fa-solid fa-heart"></i>
                                    </div>`;
});
