import axios from "axios";

export default {
    // Gets all books
    getCountry: function(id) {
      return axios.get("http://localhost:3001/costs/countryinfo/" + id);
    },
    // Gets the book with the given id
    getCategories: function() {
      return axios.get("http://localhost:3001/categories");
    }
  };
  