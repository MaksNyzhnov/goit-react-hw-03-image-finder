import React from 'react';

class LoadButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        className="Button"
        onClick={() => {
          this.props.onClick();
        }}
      >
        Load more
      </button>
    );
  }
}

export default LoadButton;
