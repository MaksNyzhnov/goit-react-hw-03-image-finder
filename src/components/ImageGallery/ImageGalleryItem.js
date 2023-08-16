import React from 'react';

class ImageGalleryItem extends React.Component {
  render() {
    const { smallPicture, onClick, alt } = this.props;
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={smallPicture}
          alt={alt}
          onClick={onClick}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
