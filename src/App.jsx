import Searchbar from "components/Searchbar/Searchbar";
import { Component } from "react";

export class App extends Component {
  render() {
    return (
    <>
      <Searchbar onSubmit={this.onSubmit} />
    </>
  );
  }
};
