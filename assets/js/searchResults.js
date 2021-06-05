export const deleteSearchResults = () => {
  const parentElem = document.getElementById("searchResults");
  let childElem = parentElem.lastElementChild;

  while (childElem) {
    parentElem.removeChild(childElem);
    childElem = parentElem.lastElementChild;
  }
};

export const buildSearchResults = (resultArr) => {
  resultArr.forEach((result) => {
    const resultItem = createResultItem(result);
    const resultContents = document.createElement("div");

    resultContents.classList.add("result_contents");
    if (result.img) {
      const resultImg = createResultImage(result);

      resultContents.append(resultImg);
    }

    const resultText = createResultText(result);

    resultContents.append(resultText);
    resultItem.append(resultContents);

    const searchResults = document.getElementById("searchResults");

    searchResults.append(resultItem);
  });
};

const createResultItem = (result) => {
  const resultItem = document.createElement("div");

  resultItem.classList.add("result_item");

  const resultTitle = document.createElement("div");

  resultTitle.classList.add("result_title");

  const link = document.createElement("a");

  link.href = `https://en.wikipedia.org/?curid=${result.id}`;
  link.textContent = result.title;
  link.target = "_blank";
  resultTitle.append(link);
  resultItem.append(resultTitle);

  return resultItem;
};

const createResultImage = (result) => {
  const resultImg = document.createElement("div");

  resultImg.classList.add("result_img");

  const img = document.createElement("img");

  img.src = result.img;
  img.alt = result.title;
  resultImg.append(img);

  return resultImg;
};

const createResultText = (result) => {
  const resultText = document.createElement("div");

  resultText.classList.add("result_text");

  const resultDesc = document.createElement("p");

  resultDesc.classList.add("result_desc");
  resultDesc.textContent = result.text;
  resultText.append(resultDesc);

  return resultText;
};

export const clearStatsLine = () => {
  document.getElementById("stats").textContent = "";
};

export const setStatsLine = (numResults) => {
  const statLine = document.getElementById("stats");

  if (numResults) {
    statLine.textContent = `Displaying ${numResults} results.`;
  } else {
    statLine.textContent = "Sorry, no result.";
  }
};
