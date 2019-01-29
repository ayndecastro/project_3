import axios from "axios";
import { func } from "prop-types";
import {API_URL} from '../../constants'

export default {
    // Gets all books
    getCountry: function(id) {
      return axios.get(`${API_URL}/costs/countryinfo/` + id);
    },
    // Gets the book with the given id
    getCategories: function() {
      return axios.get(`${API_URL}/categories`);
    },
    getCountryName: function(name) {
      return axios.get(`${API_URL}/search/country/`+ name);
    }
  };
  