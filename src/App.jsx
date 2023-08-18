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
    this.setState({ search: searchText });
  }
  handleLoadMore = async () => {
    const { page, search } = this.state;
    this.setState({ loader: true });

    const newImages = await getImagesBySearch(search, page);

    this.setState(prevState => ({
      images: [...prevState.images, ...newImages],
      page: prevState.page + 1,
      loader: false,
    }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ isModalOpen: true, largeImageURL });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  async componentDidMount() {
    // this.setState({ loader: true });

    // const images = await getImagesBySearch(this.props.search, this.state.page);

    // this.setState({ images: images, loader: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.setState({
        images: [],
        page: 1,
      });
      await this.handleLoadMore();
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
