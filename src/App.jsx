import { Component } from "react";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";



export class App extends Component {
  state = {
    search: '',
    loader: false
  }
  onSearch = (searchText) => {
    if (searchText === this.state.search) {
      return
    }
    this.setState({ search: searchText });
  }
  render() {
    const {search} = this.state
    return (
    <>
        <Searchbar onSubmit={this.onSearch} />
        {search && <ImageGallery search={search}/>}
        
    </>
  );
  }
};
