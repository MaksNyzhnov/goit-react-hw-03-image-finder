import { Component } from "react";
import Searchbar from "components/Searchbar/Searchbar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import getImagesBySearch from 'services/api';
import LoadButton from "components/ImageGallery/loadButton";
import Modal from 'components/Modal';
import { Grid } from 'react-loader-spinner';



export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    loader: false,
    isModalOpen: false,
    largeImageURL: ''
  }
  onSearch = (searchText) => {
    if (searchText === this.state.search) {
      return
    }
    
    this.setState({ search: searchText, images: [],
      page: 1,
    });
    console.log(this.state.images)
  }
  handleLoadMore = () => {
    
    this.setState(prevState => ({
     
    page: prevState.page + 1,
      
    }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ isModalOpen: true, largeImageURL });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  async componentDidMount() {
    
  }

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state
    if (search === '') {
      this.setState({
        images: []
      })
      return
    }
    if (prevState.search !== this.state.search || prevState.page !== this.state.page) {
      const newResponse = await getImagesBySearch(search, page)
      const newImages = newResponse.hits
      this.setState((prevState) => (
        {
          images: [...prevState.images,...newImages],
          
        }
      ))
    }
  }
  render() {
    const {search, images, loader, isModalOpen, largeImageURL} = this.state
    return (
    <>
        <Searchbar onSubmit={this.onSearch} />
        {search && <ImageGallery search={search} images={images} onImageClick={this.handleImageClick} />}
        {loader && (
          <Grid
            height="80"
            width="80"
            color="#5c09e2"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        {images.length !== 0 && images.length % 12 === 0 && (
          <LoadButton onClick={this.handleLoadMore} />
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={this.closeModal}
          image={largeImageURL}
        ></Modal>
        
    </>
  );
  }
};
