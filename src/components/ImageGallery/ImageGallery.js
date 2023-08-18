import { Component } from 'react';

import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { search, images, onImageClick } = this.props;

    return (
      <>
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <ImageGalleryItem
                key={id}
                smallPicture={webformatURL}
                onClick={() => onImageClick(largeImageURL)}
                alt={search}
              />
            );
          })}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
