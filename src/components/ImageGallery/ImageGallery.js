import { Component } from 'react';
import getImagesBySearch from 'services/api';
import ImageGalleryItem from './ImageGalleryItem';
import LoadButton from './loadButton';
import Modal from 'components/Modal';
import { Grid } from 'react-loader-spinner';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loader: false,
    isModalOpen: false,
    largeImageURL: '',
  };

  handleLoadMore = async () => {
    const { search } = this.props;
    const { page } = this.state;
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
    this.setState({ loader: true });

    const images = await getImagesBySearch(this.props.search, this.state.page);

    this.setState(prevState => {
      return {
        images: images,
        page: prevState.page + 1,
      };
    });
    this.setState({ loader: false });
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search) {
      this.setState({
        images: [],
        page: 1,
      });
      await this.handleLoadMore();
    }
  }

  render() {
    const { search } = this.props;
    const { images, loader, isModalOpen, largeImageURL } = this.state;
    return (
      <>
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                smallPicture={webformatURL}
                onClick={() => this.handleImageClick(largeImageURL)}
                alt={search}
              />
            );
          })}
        </ul>
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
        {images.length !== 0 && <LoadButton onClick={this.handleLoadMore} />}
        <Modal
          isOpen={isModalOpen}
          onClose={this.closeModal}
          image={largeImageURL}
        ></Modal>
      </>
    );
  }
}

export default ImageGallery;
