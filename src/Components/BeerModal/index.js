import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'ivanciceksstorybook/dist';
import close from '../../../assets/cancel-circle.png';
import style from './index.css';


class BeerModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <div className={style.backdrop}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <div className={style.modalHeaderLeft}>
              <span>{this.props.beerName}</span>
            </div>
            <div className={style.modalHeaderRight}>
              <Button onClick={this.props.onClose}>
                <img imgUrl={close} alt="closeImage" className={style.closeImage} />
              </Button>
            </div>
          </div>
          <div className={style.modalBody}>
            <div className={style.modalBodyLeft}>
              <img imgUrl={this.props.imgUrl} alt="beerImage" />
            </div>
            <div className={style.modalBodyRight}>
              <span >
                {this.props.beerDescription}
              </span>
            </div>
          </div>
          <div className={style.modalFooter}>
            <Button onClick={this.props.onClose}>
              Close
            </Button>
            <Button onClick={() => { this.props.markBeerAsFavorite(this.props.beerId); }}>
              Mark beer as favorite
            </Button>
            <Button onClick={() => this.props.addBeerToCart(this.props.beerId)}>
              Add beer To Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

BeerModal.defaultProps = {
  beerName: '',
  show: false,
  imgUrl: '',
  beerDescription: '',
  beerId: -1
};

BeerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  beerName: PropTypes.string,
  imgUrl: PropTypes.string,
  beerDescription: PropTypes.string,
  markBeerAsFavorite: PropTypes.func.isRequired,
  addBeerToCart: PropTypes.func.isRequired,
  beerId: PropTypes.number
};

export default BeerModal;
