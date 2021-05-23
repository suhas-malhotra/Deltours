const cards = document.querySelectorAll(".wcard");
const allresults = document.querySelector("#allresults");
const searchresults = document.querySelector("#searchresults");

function performSearch(query) {
  const items = [];
  cards.forEach((card) =>
    items.push({ text: card.innerText, item: card.cloneNode(true) })
  );

  const filteredItems = items.filter((item) =>
    new RegExp(`.*${query}.*`, "gmi").test(item.text)
  );

  return filteredItems;
}

function processInput(query) {
  if (query !== "") {
    const items = performSearch(query);
    searchresults.innerHTML = "";
    items.forEach((item) => searchresults.appendChild(item.item));

    allresults.style.display = "none";
    searchresults.style.display = "flex";
  } else {
    allresults.style.display = "flex";
    searchresults.style.display = "none";
  }
}

const searchInput = document.querySelector("#searchName");
searchInput.addEventListener("input", (e) => {
  processInput(e.target.value);
});
