import axios from "axios";
import { func } from "prop-types";
import {API_URL} from '../../constants'

export default {
    // Gets all books
    getCountry: function(id) {
      return axios.get(`/costs/countryinfo/` + id);
    },
    // Gets the book with the given id
    getCategories: function() {
      return axios.get(`/categories`);
    },
    getCountryName: function(name) {
      return axios.get(`/search/country/ `+ name);
    }
  };
  