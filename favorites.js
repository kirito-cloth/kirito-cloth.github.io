// favorites.js
export function getFavorites() {
  const fav = localStorage.getItem('favorites');
  return fav ? JSON.parse(fav) : [];
}

export function setFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function toggleFavorite(id) {
  let fav = getFavorites();
  if (fav.includes(id)) {
    fav = fav.filter(f => f !== id);
  } else {
    fav.push(id);
  }
  setFavorites(fav);
}
