import "../component/search-bar.js";
import DataSource from "../data/data-source.js";

const main = () => {
  const searchElement = document.querySelector("search-bar");
  const mealListElement = document.querySelector("#mealList");

  const onButtonSearchClicked = async () => {
    try {
      const result = await DataSource.searchMeal(searchElement.value);
      renderResult(result);
    } catch (message) {
      fallbackResult(message);
    }
  };

  const fetchDataOnPageLoad = async () => {
    try {
      const defaultKeyword = "";
      const result = await DataSource.searchMeal(defaultKeyword);
      renderResult(result);
    } catch (message) {
      fallbackResult(message);
    }
  };

  const renderResult = (results) => {
    mealListElement.innerHTML = "";

    results.forEach((meal) => {
      const { strMeal, strMealThumb, strArea, strCategory, strYoutube } = meal;
      const mealElement = createMealElement(strMeal, strMealThumb, strArea, strCategory, strYoutube, meal);

      mealListElement.appendChild(mealElement);
    });
  };

  const createMealElement = (strMeal, strMealThumb, strArea, strCategory, strYoutube) => {
    const mealElement = document.createElement("div");
    mealElement.classList.add("meal");

    mealElement.innerHTML = `
      <img src="${strMealThumb}" alt="Meals" />
      <div class="meal-info">
        <h3>${strMeal}</h3>
        <p>${strArea}</p>
        <p><h4>Kategori Makanan</h4>${strCategory}</p><br>
        <button> <a href="${strYoutube}">Link Video</a></button>
       
      </div>
    `;

    return mealElement;
  };

  
  const fallbackResult = (message) => {
    mealListElement.innerHTML = `<h2 class="placeholder">${message}</h2>`;
  };

  searchElement.clickEvent = onButtonSearchClicked;

  fetchDataOnPageLoad();
};

export default main;
