import React from 'react';
import { Grid } from 'react-loader-spinner';

class Modal extends React.Component {
  render() {
    const { isOpen, onClose, image } = this.props;

    if (!isOpen) {
      return <></>;
    }

    return (
      <div className="Overlay" onClick={onClose}>
        <Grid
          height="80"
          width="80"
          color="#5c09e2"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
          }}
          wrapperClass=""
          visible={true}
        />
        <div className="Modal">
          <img src={image} alt="bigger one" loading="lazy" />
        </div>
      </div>
    );
  }
}

export default Modal;
