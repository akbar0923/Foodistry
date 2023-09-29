import axios from "axios";

class DataSource {
  static async searchMeal(keyword) {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);

    if (response.data.meals) {
      return response.data.meals;
    } else {
      throw new Error(`Makanan tidak tersedia "${keyword}".`);
    }
  }



}

export default DataSource;
