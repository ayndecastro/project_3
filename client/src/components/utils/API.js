import axios from "axios";

export default {
    // Gets all books
    getCountry: function(id) {
      return axios.get("/costs/countryinfo/" + id);
    },
    // Gets the book with the given id
    getCategories: function() {
      return axios.get("/categories");
    }
  };
  