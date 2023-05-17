async function getData(url) {
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
}

getData("http://localhost:1337/api/articles");
