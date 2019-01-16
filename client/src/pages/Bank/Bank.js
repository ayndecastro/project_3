import React, { Component } from "react";
import API from "../../components/utils/API"

class Detail extends Component {
  state = {
    book: {}
  };
  // Add code to get the book with an _id equal to the id in the route param
  // e.g. http://localhost:3000/books/:id
  // The book id for this route can be accessed using this.props.match.params.id
  componentDidMount() {
    API.getCategories().then(res=>this.setState({book: res.data}))
  }

  render() {
    return (
      <div>
        {console.log(this.state.book)}
      </div>
    );
  }
}

export default Detail;
