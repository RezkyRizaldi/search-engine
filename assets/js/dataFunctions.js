export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById("search").value.trim();
  const regex = /[]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, " ");
  return searchTerm;
};

export const retreiveSearchResults = async (searchTerm) => {
  const wikiSearchStr = getWikiSearchString(searchTerm);
  const wikiSearchResults = await requestData(wikiSearchStr);
  let resultArr = [];

  if (wikiSearchResults.hasOwnProperty("query")) {
    resultArr = processWikiResults(wikiSearchResults.query.pages);
  }

  return resultArr;
};

const getWikiSearchString = (searchTerm) => {
  const maxChars = getMaxChars();
  const rawSearchStr = `https://en.wikipedia.org/w/api.php?action=query&generator=search&search=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchStr = encodeURI(rawSearchStr);
  return searchStr;
};

const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChars;

  if (width < 414) maxChars = 65;
  if (width >= 414 && width < 1400) maxChars = 100;
  if (width >= 1400) maxChars = 130;
  return maxChars;
};

const requestData = async (searchStr) => {
  try {
    const response = await fetch(searchStr);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const processWikiResults = (results) => {
  const resultArr = [];

  Object.keys(results).forEach((key) => {
    const id = key;
    const title = results[key].title;
    const text = results[key].extract;
    const img = results[key].hasOwnProperty("thumbnail") ? results[key].thumbnail.source : null;
    const item = { id, title, text, img };

    resultArr.push(item);
  });

  return resultArr;
};
