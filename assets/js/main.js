import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener } from "./searchBar.js";
import { deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine } from "./searchResults.js";
import { getSearchTerm, retreiveSearchResults } from "./dataFunctions.js";

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  const search = document.getElementById("search");

  search.addEventListener("input", showClearTextButton);

  const clear = document.getElementById("clear");

  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("searchBar");

  form.addEventListener("submit", submitSearch);
};

const submitSearch = (e) => {
  e.preventDefault();
  deleteSearchResults();
  processSearch();
  setSearchFocus();
};

const processSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();

  if (searchTerm === "") return;

  const resultArr = await retreiveSearchResults(searchTerm);

  if (resultArr.length) buildSearchResults(resultArr);
  setStatsLine(resultArr.length);
};
