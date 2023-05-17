export function getExistingFavs() {
  const favs = localStorage.getItem("favourites");

  if (!favs) {
    return [];
  } else {
    return JSON.parse(favs);
  }
}
